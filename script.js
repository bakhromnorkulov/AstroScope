const orrery = document.getElementById('orrery');

// Define celestial bodies
const celestialBodies = [
    { name: 'Mercury', distance: 80, size: 5, color: 'gray' },
    { name: 'Venus', distance: 120, size: 8, color: 'yellow' },
    { name: 'Earth', distance: 160, size: 10, color: 'blue' },
    { name: 'Mars', distance: 200, size: 7, color: 'red' },
    { name: 'Jupiter', distance: 260, size: 25, color: 'orange' },
    { name: 'Saturn', distance: 320, size: 22, color: 'goldenrod' },
    { name: 'Uranus', distance: 380, size: 18, color: 'lightblue' },
    { name: 'Neptune', distance: 440, size: 17, color: 'blueviolet' },
];

// Create celestial bodies
const planets = celestialBodies.map(body => createCelestialBody(body));

let isRunning = false; // Start with the orrery stopped
let zoomLevel = 1;

document.getElementById('start').addEventListener('click', () => {
    isRunning = true;
});

document.getElementById('stop').addEventListener('click', () => {
    isRunning = false;
});

document.getElementById('zoom-in').addEventListener('click', () => {
    zoomLevel *= 1.2; // Zoom in
    updateZoom();
});

document.getElementById('zoom-out').addEventListener('click', () => {
    zoomLevel /= 1.2; // Zoom out
    updateZoom();
});

function createCelestialBody(body) {
    const planet = document.createElement('div');
    planet.classList.add('planet');
    planet.style.width = `${body.size}px`;
    planet.style.height = `${body.size}px`;
    planet.style.backgroundColor = body.color;
    planet.style.position = 'absolute';
    planet.style.left = '50%';
    planet.style.top = '50%';
    planet.style.transformOrigin = '0 -' + body.distance + 'px';
    planet.style.transform = `rotate(0deg) translateY(-${body.distance}px)`;

    orrery.appendChild(planet);

    let angle = 0;
    const animate = () => {
        if (isRunning) {
            angle += 1; // Change the angle to make the planet orbit
            planet.style.transform = `rotate(${angle}deg) translateY(-${body.distance}px)`;
        }
        requestAnimationFrame(animate);
    };
    animate(); // Start animation for this planet
    return planet; // Return the planet for potential future use
}

function updateZoom() {
    orrery.style.transform = `scale(${zoomLevel})`;
}
