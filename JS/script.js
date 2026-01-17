const width = document.getElementById('div-two').clientWidth;
const height = document.getElementById('div-two').clientHeight;

const colors = {
  center: '#FF6B9D',
  art: '#FFB5C5',
  technology: '#A8D5FF',
  entrepreneurship: '#C5B4E3',
  filmmaking: '#FFD4A3',
  'ui/ux': '#FFE5B4',
  cinematography: '#FFC4A3',
  editing: '#FFAA80',
  'adobe-premiere': '#FF9999',
  davinci: '#FFCCB3',
  figma: '#FFE680',
  hardware: '#B3E0FF',
  javascript: '#C4E0FF',
  css: '#D4F0FF',
  html: '#E0F4FF',
  tailwind: '#B8E6E6',
  python: '#A3C4FF',
  react: '#B8D4FF',
  'stealth-startup': '#D4C4FF',
  youtube: '#E6D4FF',
  modlr: '#F0E0FF'
};

const graphData = {
  nodes: [
    { id: 'center', label: '', img: 'attributes/images/portrait.png', size: 50, color: colors.center, fx: width / 2, fy: height / 2 },
    { id: 'art', label: 'Art', size: 25, color: colors.art },
    { id: 'technology', label: 'Technology', size: 25, color: colors.technology },
    { id: 'entrepreneurship', label: 'Entrepreneurship', size: 25, color: colors.entrepreneurship },
    { id: 'filmmaking', label: 'Filmmaking', size: 18, color: colors.filmmaking },
    { id: 'ui/ux', label: 'UI/UX', size: 18, color: colors['ui/ux'] },
    { id: 'cinematography', label: 'Cinematography', size: 15, color: colors.cinematography },
    { id: 'editing', label: 'Editing', size: 15, color: colors.editing },
    { id: 'adobe-premiere', label: 'Adobe Premiere Pro', size: 12, color: colors['adobe-premiere'] },
    { id: 'davinci', label: 'DaVinci Resolve', size: 12, color: colors.davinci },
    { id: 'figma', label: 'Figma', size: 15, color: colors.figma },
    { id: 'hardware', label: 'Hardware', size: 18, color: colors.hardware },
    { id: 'javascript', label: 'JavaScript', size: 15, color: colors.javascript },
    { id: 'css', label: 'CSS', size: 12, color: colors.css },
    { id: 'html', label: 'HTML', size: 12, color: colors.html },
    { id: 'tailwind', label: 'Tailwind', size: 12, color: colors.tailwind },
    { id: 'python', label: 'Python', size: 15, color: colors.python },
    { id: 'react', label: 'React', size: 15, color: colors.react },
    { id: 'stealth-startup', label: 'Stealth Startup', size: 15, color: colors['stealth-startup'] },
    { id: 'youtube', label: 'Youtube', size: 15, color: colors.youtube },
    { id: 'modlr', label: 'MODLR', size: 15, color: colors.modlr }
  ],
  links: [
    { source: 'center', target: 'art' },
    { source: 'center', target: 'technology' },
    { source: 'center', target: 'entrepreneurship' },
    { source: 'art', target: 'filmmaking' },
    { source: 'art', target: 'ui/ux' },
    { source: 'filmmaking', target: 'cinematography' },
    { source: 'filmmaking', target: 'editing' },
    { source: 'editing', target: 'adobe-premiere' },
    { source: 'editing', target: 'davinci' },
    { source: 'ui/ux', target: 'figma' },
    { source: 'technology', target: 'hardware' },
    { source: 'technology', target: 'javascript' },
    { source: 'technology', target: 'python' },
    { source: 'javascript', target: 'css' },
    { source: 'javascript', target: 'html' },
    { source: 'javascript', target: 'react' },
    { source: 'css', target: 'tailwind' },
    { source: 'entrepreneurship', target: 'stealth-startup' },
    { source: 'entrepreneurship', target: 'youtube' },
    { source: 'entrepreneurship', target: 'modlr' }
  ]
};

const svg = d3.select('#div-two')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const simulation = d3.forceSimulation(graphData.nodes)
  .force('link', d3.forceLink(graphData.links).id(d => d.id).distance(d => {
    // Make primary connections (art, technology, entrepreneurship) longer
    if ((d.source.id === 'center' && ['art', 'technology', 'entrepreneurship'].includes(d.target.id)) ||
        (d.target.id === 'center' && ['art', 'technology', 'entrepreneurship'].includes(d.source.id))) {
      return 120;
    }
    return 60;
  }))
  .force('charge', d3.forceManyBody().strength(-500))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('collision', d3.forceCollide().radius(d => d.size + 5))
  .force('x', d3.forceX(width / 2).strength(0.1))
  .force('y', d3.forceY(height / 2).strength(0.1))
  .alphaDecay(0.02); 

const link = svg.append('g')
  .selectAll('line')
  .data(graphData.links)
  .enter()
  .append('line')
  .attr('stroke', '#E0E0E0')
  .attr('stroke-width', 1.5);

const node = svg.append('g')
  .selectAll('g')
  .data(graphData.nodes)
  .enter()
  .append('g')
  .call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended));

// Add circles
node.append('circle')
  .attr('r', d => d.size)
  .attr('fill', d => d.id === 'center' ? 'url(#portrait)' : d.color)
  .attr('stroke', '#fff')
  .attr('stroke-width', 2);

const defs = svg.append('defs');

// Add clipPath for circular mask
defs.append('clipPath')
  .attr('id', 'circle-clip')
  .append('circle')
  .attr('r', 50);

defs.append('pattern')
  .attr('id', 'portrait')
  .attr('width', 1)
  .attr('height', 1)
  .attr('patternContentUnits', 'objectBoundingBox')
  .append('image')
  .attr('href', 'attributes/images/portrait.png')
  .attr('width', 1)
  .attr('height', 1)
  .attr('preserveAspectRatio', 'xMidYMid slice');

// Add labels
node.append('text')
  .text(d => d.label)
  .attr('x', 0)
  .attr('y', d => d.size + 12)
  .attr('text-anchor', 'middle')
  .attr('font-size', '10px')
  .attr('fill', '#666')
  .attr('font-family', 'helvetica-neue');

simulation.on('tick', () => {
  link
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);

  node.attr('transform', d => {
    d.x = Math.max(d.size, Math.min(width - d.size, d.x));
    d.y = Math.max(d.size, Math.min(height - d.size, d.y));
    return `translate(${d.x},${d.y})`;
  });
});

function dragstarted(event) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  event.subject.fx = event.subject.x;
  event.subject.fy = event.subject.y;
}

function dragged(event) {
  event.subject.fx = event.x;
  event.subject.fy = event.y;
}

function dragended(event) {
  if (!event.active) simulation.alphaTarget(0);
  event.subject.fx = null;
  event.subject.fy = null;
}

// const days = {
//     0: "Sun",
//     1: "Mon",
//     2: "Tue",
//     3: "Wed",
//     4: "Thu",
//     5: "Fri",
//     6: "Sat"
// }
// const months = {
//     0: "Jan",
//     1: "Feb", 
//     2: "Mar",
//     3: "Apr",
//     4: "May",
//     5: "Jun", 
//     6: "Jul",
//     7: "Aug", 
//     8: "Sep", 
//     9: "Oct",
//     10: "Nov", 
//     11: "Dec"
// }

// const date = new Date()
// terminalDate = days[date.getDay()] + " " + months[date.getMonth()] + " " + date.getDate() + " " 
// + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " on ttys001"

// const lastLogin = document.getElementById("last-login")
// lastLogin.textContent = "Last login: " + terminalDate