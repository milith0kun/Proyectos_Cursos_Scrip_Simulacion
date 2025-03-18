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

class Particle {
    constructor(opts = {}) {
        this.bounds = opts.bounds;
        this.x = opts.x || 0;
        this.y = opts.y || 0;
        this.element = opts.element;
        this.trail = opts.element.querySelector('.trail');
        this.velocity = new Vector(opts.vx || 0, opts.vy || 0);
        this.acceleration = new Vector();
        this.trailContainer = opts.trailContainer; // Add this line
        this.mass = opts.mass || 1.5;
        this.maxSpeed = opts.maxSpeed || 4.0;
        this.maxForce = opts.maxForce || 0.5;
        this.trailUpdateInterval = 50; // More frequent trail updates
        this.phase = opts.phase || 'entering';
        this.timeInPhase = 0;
        this.targetPosition = opts.targetPosition || null;
        this.dampening = opts.dampening || 0.99;
        this.trailMarks = new Queue(); // Cola para marcas de rastro
        this.lastTrailPosition = { x: 0, y: 0 };
        this.trailUpdateInterval = 100; // Intervalo para crear marcas
        this.lastTrailUpdate = 0;
    }

    update(centerPoint) {
        if (this.phase === 'entering') {
            this.seek(centerPoint);
        } else if (this.phase === 'bouncing') {
            this.bounce(centerPoint);
        } else if (this.phase === 'positioning' && this.targetPosition) {
            this.seek(this.targetPosition);
        }

        this.velocity.add(this.acceleration);
        
        if (this.velocity.magnitude > this.maxSpeed) {
            this.velocity.setMagnitude(this.maxSpeed);
        }
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        this.acceleration = new Vector();
        this.updateVisuals();
        this.timeInPhase++;
    }

    seek(target) {
        const desired = new Vector(
            target.x - this.x,
            target.y - this.y
        );
        
        desired.setMagnitude(this.maxSpeed);
        
        const steer = new Vector(
            desired.x - this.velocity.x,
            desired.y - this.velocity.y
        );
        
        if (steer.magnitude > this.maxForce) {
            steer.setMagnitude(this.maxForce);
        }
        
        this.acceleration.add(steer);
    }

    bounce(center) {
        const distance = Math.sqrt(
            Math.pow(center.x - this.x, 2) + 
            Math.pow(center.y - this.y, 2)
        );
        
        if (distance < 30) {
            const angle = Math.atan2(this.y - center.y, this.x - center.x);
            this.velocity.setAngle(angle);
            this.velocity.setMagnitude(this.maxSpeed);
        }
    }

    updateVisuals() {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        
        const speed = this.velocity.magnitude;
        const angle = Math.atan2(this.velocity.y, this.velocity.x);
        
        // Improved trail dynamics
        const trailWidth = speed > 3.5 ? 220 : speed > 2.5 ? 170 : 120;
        const trailHeight = speed > 3.5 ? 32 : speed > 2.5 ? 24 : 16;
        const opacity = Math.min((speed / 3.5) * 0.9, 0.9);
        
        this.trail.style.width = `${trailWidth}px`;
        this.trail.style.height = `${trailHeight}px`;
        this.trail.style.opacity = opacity;
        this.trail.style.transform = `translate(0, -50%) rotate(${angle}rad)`;

        // More responsive trail marks
        const now = Date.now();
        if (now - this.lastTrailUpdate > this.trailUpdateInterval && speed > 1) {
            this.createTrailMark(speed);
            this.lastTrailUpdate = now;
        }
    }

    createTrailMark(speed) {
        const mark = document.createElement('div');
        mark.className = 'trail-mark';
        mark.style.left = `${this.x}px`;
        mark.style.top = `${this.y}px`;
        const size = Math.min(35, 20 + speed * 5);
        mark.style.width = `${size}px`;
        mark.style.height = `${size}px`;
        mark.style.transform = 'translate(-50%, -50%)';
        mark.style.opacity = Math.min(0.4, 0.2 + speed * 0.05);
        
        this.trailContainer.appendChild(mark);
        this.trailMarks.enqueue(mark);

        // Smoother fade out
        setTimeout(() => {
            mark.style.transition = 'opacity 1.5s ease-out';
            mark.style.opacity = '0';
            setTimeout(() => {
                mark.remove();
                this.trailMarks.dequeue();
            }, 1500);
        }, 50);

        if (this.trailMarks.getLength() > 25) {
            const oldMark = this.trailMarks.dequeue();
            if (oldMark && oldMark.parentNode) {
                oldMark.remove();
            }
        }
    }
}

class ParticleSystem {
    constructor() {
        this.container = document.querySelector('.particles-container');
        this.elements = document.querySelectorAll('.element');
        this.containerBounds = this.container.getBoundingClientRect();
        
        // Create particle trail container
        this.trailContainer = document.createElement('div');
        this.trailContainer.className = 'particle-trail';
        this.container.appendChild(this.trailContainer);
        
        const letterE = document.querySelector('.letter:nth-child(2)');
        const eBounds = letterE.getBoundingClientRect();
        
        this.centerPoint = {
            x: (eBounds.left + eBounds.width / 2) - this.containerBounds.left,
            y: (eBounds.top + eBounds.height / 2) - this.containerBounds.top
        };
        
        this.bounds = {
            width: 140,
            height: 65,
            padding: 8,
            center: {
                x: 70,
                y: 32.5
            }
        };
        
        this.particles = [];
        this.letterPositions = this.calculateLetterPositions();
        this.usedPositions = new Set();
        this.letterBounds = this.calculateLetterBounds();
        this.init();
    }

    calculateLetterPositions() {
        const letters = document.querySelectorAll('.letter');
        const positions = [];
        
        letters.forEach(letter => {
            const bounds = letter.getBoundingClientRect();
            const radius = 25;
            const points = 8;
            
            for (let i = 0; i < points; i++) {
                const angle = (i / points) * Math.PI * 2;
                positions.push({
                    x: (bounds.left + bounds.width/2) - this.containerBounds.left + Math.cos(angle) * radius,
                    y: (bounds.top + bounds.height/2) - this.containerBounds.top + Math.sin(angle) * radius
                });
            }
        });
        return positions;
    }

    getFreePosition() {
        const availablePositions = this.letterPositions.filter(pos => 
            !Array.from(this.usedPositions).some(usedPos => 
                Math.hypot(usedPos.x - pos.x, usedPos.y - pos.y) < 20
            )
        );
        
        if (availablePositions.length === 0) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 30 + Math.random() * 10;
            return {
                x: this.bounds.center.x + Math.cos(angle) * radius,
                y: this.bounds.center.y + Math.sin(angle) * radius
            };
        }
        
        const position = availablePositions[Math.floor(Math.random() * availablePositions.length)];
        this.usedPositions.add(position);
        return position;
    }

    init() {
        this.elements.forEach((element, index) => {
            const side = Math.floor(Math.random() * 4);
            let startX, startY, vx, vy;
            
            switch(side) {
                case 0: // top
                    startX = Math.random() * this.bounds.width;
                    startY = -10;
                    vx = (Math.random() - 0.5) * 2;
                    vy = 2 + Math.random() * 1.5;
                    break;
                case 1: // right
                    startX = this.bounds.width + 10;
                    startY = Math.random() * this.bounds.height;
                    vx = -(2 + Math.random() * 1.5);
                    vy = (Math.random() - 0.5) * 2;
                    break;
                case 2: // bottom
                    startX = Math.random() * this.bounds.width;
                    startY = this.bounds.height + 10;
                    vx = (Math.random() - 0.5) * 2;
                    vy = -(2 + Math.random() * 1.5);
                    break;
                case 3: // left
                    startX = -10;
                    startY = Math.random() * this.bounds.height;
                    vx = 2 + Math.random() * 1.5;
                    vy = (Math.random() - 0.5) * 2;
                    break;
            }

            const particle = new Particle({
                element: element,
                x: startX,
                y: startY,
                vx: vx,
                vy: vy,
                mass: 1.2 + Math.random(),
                maxSpeed: 3.5,
                maxForce: 0.4,
                bounds: this.bounds,
                phase: 'entering',
                dampening: 0.99,
                targetPosition: this.getFreePosition(),
                trailContainer: this.trailContainer // Add this line
            });
            
            this.particles.push(particle);
        });

        this.animate();
    }

    calculateLetterBounds() {
        const letters = document.querySelectorAll('.letter');
        return Array.from(letters).map(letter => {
            const bounds = letter.getBoundingClientRect();
            return {
                x: (bounds.left - this.containerBounds.left),
                y: (bounds.top - this.containerBounds.top),
                width: bounds.width,
                height: bounds.height
            };
        });
    }

    checkParticleCollisions(particle) {
        this.particles.forEach(other => {
            if (other !== particle) {
                const dx = other.x - particle.x;
                const dy = other.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = 55;
                
                if (distance < minDistance) {
                    const angle = Math.atan2(dy, dx);
                    const pushForce = Math.pow((minDistance - distance) / minDistance, 2.2) * 9;
                    
                    // Improved repulsion force
                    const pushX = Math.cos(angle) * pushForce;
                    const pushY = Math.sin(angle) * pushForce;
                    
                    // Mass-based collision response
                    const totalMass = particle.mass + other.mass;
                    const particleRatio = other.mass / totalMass;
                    const otherRatio = particle.mass / totalMass;
                    
                    other.x += pushX * otherRatio;
                    other.y += pushY * otherRatio;
                    particle.x -= pushX * particleRatio;
                    particle.y -= pushY * particleRatio;
                    
                    // Improved velocity adjustment
                    const dampening = 0.65 + (distance / minDistance) * 0.25;
                    particle.velocity.x = particle.velocity.x * dampening + other.velocity.x * (1 - dampening);
                    particle.velocity.y = particle.velocity.y * dampening + other.velocity.y * (1 - dampening);
                    other.velocity.x = other.velocity.x * dampening + particle.velocity.x * (1 - dampening);
                    other.velocity.y = other.velocity.y * dampening + particle.velocity.y * (1 - dampening);
                }
            }
        });
    }

    animate() {
        this.particles.forEach(particle => {
            const distanceToCenter = Math.sqrt(
                Math.pow(this.centerPoint.x - particle.x, 2) + 
                Math.pow(this.centerPoint.y - particle.y, 2)
            );

            // Improved phase transitions
            if (particle.phase === 'entering' && distanceToCenter < 48) {
                particle.phase = 'bouncing';
                particle.maxSpeed = 5.0;
                particle.maxForce = 0.8;
            } else if (particle.phase === 'bouncing' && particle.timeInPhase > 50) {
                particle.phase = 'positioning';
                particle.maxSpeed = 2.5;
                particle.maxForce = 0.5;
            }

            this.checkParticleCollisions(particle);
            particle.update(this.centerPoint);
            
            // Enhanced dynamic dampening
            const baseDampening = particle.phase === 'positioning' ? 0.985 : 0.992;
            const speedFactor = Math.min(1, particle.velocity.magnitude / particle.maxSpeed);
            const dampening = baseDampening + (1 - baseDampening) * (1 - speedFactor);
            
            particle.velocity.x *= dampening;
            particle.velocity.y *= dampening;
        });
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});