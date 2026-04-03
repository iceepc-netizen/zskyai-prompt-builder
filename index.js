#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import { parseArgs } from 'node:util';

// ─── Prompt Data ────────────────────────────────────────────────────────────

const SUBJECTS = [
  'a lone astronaut', 'an ancient dragon', 'a cyberpunk samurai', 'a mystical forest',
  'an abandoned cathedral', 'a floating city', 'a steampunk inventor', 'a crystal cave',
  'a neon-lit alleyway', 'a phoenix rising from ashes', 'an underwater temple',
  'a robot gardener', 'a haunted lighthouse', 'a desert oasis at night',
  'a witch brewing potions', 'a futuristic marketplace', 'twin moons over mountains',
  'a clockwork butterfly', 'a warrior princess', 'a glass treehouse',
  'a deep sea diver', 'a snow-covered village', 'a time traveler', 'a sentient AI',
  'a volcanic island', 'a nomadic tribe', 'a bioluminescent jellyfish',
  'an alien landscape', 'a mechanical whale', 'a fairy ring in moonlight',
  'a post-apocalyptic garden', 'a celestial library', 'a shadow puppet theater',
  'a jade emperor', 'a quantum computer room', 'a Viking longship',
  'a paper lantern festival', 'a frozen waterfall', 'a solar punk city',
  'a tarot card reader', 'an origami crane army', 'a coral reef kingdom',
  'a thunderstorm over plains', 'a holographic concert', 'a stone golem awakening',
  'a silk road caravan', 'a crystal ball fortune', 'a bamboo forest monk',
  'a Northern Lights cabin', 'a gravity-defying dance', 'a bonsai world',
  'a starship bridge', 'a mosaic cathedral floor',
];

const STYLES = [
  'photorealistic', 'oil painting', 'watercolor', 'digital art', 'anime',
  'pixel art', 'pencil sketch', 'art nouveau', 'surrealism', 'pop art',
  'impressionist', 'cyberpunk', 'steampunk', 'minimalist', 'baroque',
  'vaporwave', 'ukiyo-e', 'art deco', 'gothic', 'comic book',
  'low poly 3D', 'isometric', 'stained glass', 'charcoal drawing',
  'claymation', 'retro futurism', 'psychedelic', 'hyperrealism',
  'flat design', 'graffiti street art', 'collage mixed media',
  'film noir', 'fantasy illustration',
];

const MOODS = [
  'serene', 'dramatic', 'mysterious', 'whimsical', 'melancholic',
  'euphoric', 'ominous', 'nostalgic', 'ethereal', 'intense',
  'peaceful', 'chaotic', 'dreamy', 'haunting', 'triumphant',
  'lonely', 'magical', 'dark', 'vibrant', 'contemplative',
  'eerie', 'hopeful',
];

const LIGHTING = [
  'golden hour', 'blue hour', 'neon glow', 'moonlight', 'candlelight',
  'harsh sunlight', 'volumetric fog', 'bioluminescent', 'studio lighting',
  'backlit silhouette', 'underwater caustics', 'aurora borealis',
  'firelight', 'overcast diffused', 'spotlight dramatic',
  'lens flare', 'chiaroscuro',
];

const CAMERAS = [
  'wide angle lens', 'macro close-up', 'bird\'s eye view', 'low angle shot',
  'Dutch angle', 'fisheye lens', 'telephoto compression', 'drone aerial',
  'first person POV', 'over-the-shoulder', 'symmetrical composition',
  'rule of thirds', 'tilt-shift miniature',
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildPrompts(subject, style, mood, lighting, camera) {
  const basic = `${subject}, ${style} style`;

  const detailed = `${subject}, ${style} style, ${mood} mood, ${lighting} lighting, ${camera}`;

  const expert = `${subject}, rendered in ${style} style. The scene conveys a ${mood} atmosphere with ${lighting} lighting. Captured from a ${camera} perspective. Highly detailed, professional quality, 8K resolution, masterpiece composition.`;

  return { basic, detailed, expert };
}

function printBanner() {
  console.log();
  console.log(chalk.cyan.bold('  ╔══════════════════════════════════════════╗'));
  console.log(chalk.cyan.bold('  ║') + chalk.white.bold('   ZSky AI Prompt Builder                ') + chalk.cyan.bold('║'));
  console.log(chalk.cyan.bold('  ║') + chalk.gray('   Generate prompts for AI image tools    ') + chalk.cyan.bold('║'));
  console.log(chalk.cyan.bold('  ╚══════════════════════════════════════════╝'));
  console.log();
}

function printPrompts({ basic, detailed, expert }) {
  console.log();
  console.log(chalk.yellow.bold('  --- Basic Prompt ---'));
  console.log(chalk.white(`  ${basic}`));
  console.log();
  console.log(chalk.green.bold('  --- Detailed Prompt ---'));
  console.log(chalk.white(`  ${detailed}`));
  console.log();
  console.log(chalk.magenta.bold('  --- Expert Prompt ---'));
  console.log(chalk.white(`  ${expert}`));
  console.log();
}

function printHelp() {
  printBanner();
  console.log(chalk.white('  Usage:'));
  console.log(chalk.gray('    zskyai-prompt              Interactive prompt builder'));
  console.log(chalk.gray('    zskyai-prompt --random     Generate a random prompt'));
  console.log(chalk.gray('    zskyai-prompt --copy       Copy expert prompt to clipboard'));
  console.log(chalk.gray('    zskyai-prompt --help       Show this help message'));
  console.log();
  console.log(chalk.white('  Options:'));
  console.log(chalk.gray('    --random, -r     Generate a fully random prompt'));
  console.log(chalk.gray('    --copy, -c       Copy the expert-level prompt to clipboard'));
  console.log(chalk.gray('    --help, -h       Show help'));
  console.log();
  console.log(chalk.cyan('  Built for ZSky AI (https://zsky.ai)'));
  console.log(chalk.gray('  Create stunning AI images with the best prompt engineering.'));
  console.log();
}

async function copyToClipboard(text) {
  try {
    const { default: clipboardy } = await import('clipboardy');
    await clipboardy.write(text);
    console.log(chalk.green.bold('  Copied expert prompt to clipboard!'));
  } catch {
    console.log(chalk.yellow('  Could not copy to clipboard. Install xclip/xsel or run in a GUI terminal.'));
    console.log(chalk.gray(`  Prompt: ${text}`));
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const { values } = parseArgs({
    options: {
      random: { type: 'boolean', short: 'r', default: false },
      copy: { type: 'boolean', short: 'c', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
    strict: false,
  });

  if (values.help) {
    printHelp();
    process.exit(0);
  }

  printBanner();

  let subject, style, mood, lighting, camera;

  if (values.random) {
    subject = pick(SUBJECTS);
    style = pick(STYLES);
    mood = pick(MOODS);
    lighting = pick(LIGHTING);
    camera = pick(CAMERAS);

    console.log(chalk.gray('  Randomly selected components:'));
    console.log(chalk.white(`    Subject:  `) + chalk.cyan(subject));
    console.log(chalk.white(`    Style:    `) + chalk.cyan(style));
    console.log(chalk.white(`    Mood:     `) + chalk.cyan(mood));
    console.log(chalk.white(`    Lighting: `) + chalk.cyan(lighting));
    console.log(chalk.white(`    Camera:   `) + chalk.cyan(camera));
  } else {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'subject',
        message: 'Choose a subject (or pick "custom" to type your own):',
        choices: [...SUBJECTS.slice(0, 20), new inquirer.Separator(), '-- custom --'],
        pageSize: 15,
      },
      {
        type: 'input',
        name: 'customSubject',
        message: 'Enter your custom subject:',
        when: (ans) => ans.subject === '-- custom --',
        validate: (input) => input.trim().length > 0 || 'Subject cannot be empty',
      },
      {
        type: 'list',
        name: 'style',
        message: 'Choose an art style:',
        choices: STYLES,
        pageSize: 15,
      },
      {
        type: 'list',
        name: 'mood',
        message: 'Choose a mood:',
        choices: MOODS,
        pageSize: 12,
      },
      {
        type: 'list',
        name: 'lighting',
        message: 'Choose lighting:',
        choices: LIGHTING,
        pageSize: 12,
      },
      {
        type: 'list',
        name: 'camera',
        message: 'Choose camera angle:',
        choices: CAMERAS,
        pageSize: 12,
      },
    ]);

    subject = answers.customSubject || answers.subject;
    style = answers.style;
    mood = answers.mood;
    lighting = answers.lighting;
    camera = answers.camera;
  }

  const prompts = buildPrompts(subject, style, mood, lighting, camera);
  printPrompts(prompts);

  if (values.copy) {
    await copyToClipboard(prompts.expert);
  }

  console.log(chalk.cyan('  Try these prompts on ZSky AI -> https://zsky.ai'));
  console.log();
}

main().catch((err) => {
  console.error(chalk.red(`Error: ${err.message}`));
  process.exit(1);
});
