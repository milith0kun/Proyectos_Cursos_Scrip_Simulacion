class Queue {
    constructor(array = []) {
        this.queue = array;
    }
    
    getLength() { return this.queue.length; }
    enqueue(element) { this.queue.unshift(element); }
    dequeue() { this.queue.pop(); }
}

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.magnitude = Math.sqrt((x * x) + (y * y));
        this.angle = Math.atan2(y, x);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y));
        this.angle = Math.atan2(this.y, this.x);
        return this;
    }

    setAngle(angle) {
        this.angle = angle;
        this.x = this.magnitude * Math.cos(angle);
        this.y = this.magnitude * Math.sin(angle);
        return this;
    }

    setMagnitude(magnitude) {
        this.magnitude = magnitude;
        this.x = Math.cos(this.angle) * magnitude;
        this.y = Math.sin(this.angle) * magnitude;
        return this;
    }
}

class ParticleSystem {
    constructor() {
        this.container = document.querySelector('.particles-container');
        this.elements = document.querySelectorAll('.element');
        this.bounds = this.container.getBoundingClientRect();
        
        const letterE = document.querySelector('.letter:nth-child(2)');
        const eBounds = letterE.getBoundingClientRect();
        const containerBounds = this.container.getBoundingClientRect();
        
        this.centerPoint = {
            x: (eBounds.left + eBounds.width / 2) - containerBounds.left,
            y: (eBounds.top + eBounds.height / 2) - containerBounds.top
        };
        
        this.particles = [];
        this.init();
    }

    init() {
        this.elements.forEach((element, index) => {
            const angle = (index / this.elements.length) * Math.PI * 2;
            const radius = Math.max(this.bounds.width, this.bounds.height) * 0.5;
            const particle = new Particle({
                element: element,
                x: this.centerPoint.x + Math.cos(angle) * radius,
                y: this.centerPoint.y + Math.sin(angle) * radius,
                vx: Math.cos(angle) * -4,
                vy: Math.sin(angle) * -4,
                mass: 10,
                maxSpeed: 8,
                maxForce: 1.2,
                trailLength: 35,
                bounds: this.bounds
            });
            
            this.particles.push(particle);
        });

        this.animate();
    }

    animate = () => {
        this.particles.forEach(particle => {
            particle.gravitate(this.centerPoint);
            particle.update();
        });
        requestAnimationFrame(this.animate);
    }
}

class Particle {
    constructor(opts = {}) {
        this.bounds = opts.bounds;
        this.x = opts.x || 0;
        this.y = opts.y || 0;
        this.element = opts.element;
        this.trail = opts.element.querySelector('.trail');
        this.velocity = new Vector(opts.vx || 0, opts.vy || 0);
        this.acceleration = new Vector();
        this.mass = opts.mass || 20;
        this.maxSpeed = opts.maxSpeed || 4;
        this.maxForce = opts.maxForce || 0.5;
        this.trailPoints = new Queue();
        this.trailLength = opts.trailLength || 10;
    }

    update() {
        if (this.acceleration.magnitude) {
            this.accelerate();
        }

        this.trailPoints.enqueue({ x: this.x, y: this.y });
        if (this.trailPoints.getLength() >= this.trailLength) {
            this.trailPoints.dequeue();
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.updateTrail();
    }

    accelerate() {
        if (this.acceleration.magnitude > this.maxForce) {
            this.acceleration.setMagnitude(this.maxForce);
        }
        this.velocity.add(this.acceleration);
        
        if (this.velocity.magnitude > this.maxSpeed) {
            this.velocity.setMagnitude(this.maxSpeed);
        }
    }

    updateTrail() {
        if (this.trailPoints.getLength() < 2) return;
        
        const opacity = 0.9;
        const width = Math.min(50, this.velocity.magnitude * 12);
        
        this.trail.style.width = `${width}px`;
        this.trail.style.opacity = opacity;
        const angle = Math.atan2(this.velocity.y, this.velocity.x) + Math.PI;
        this.trail.style.transform = `rotate(${angle}rad)`;
    }

    gravitate(centerPoint) {
        const dx = centerPoint.x - this.x;
        const dy = centerPoint.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 30) {
            const angle = Math.atan2(dy, dx);
            const orbitSpeed = 5;
            this.velocity.x = -Math.sin(angle) * orbitSpeed;
            this.velocity.y = Math.cos(angle) * orbitSpeed;
        } else {
            const force = 1500 / (distance * distance);
            this.acceleration.x = dx * force;
            this.acceleration.y = dy * force;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});