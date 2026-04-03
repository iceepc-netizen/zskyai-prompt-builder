# zskyai-prompt-builder

[![npm version](https://img.shields.io/npm/v/zskyai-prompt-builder.svg)](https://www.npmjs.com/package/zskyai-prompt-builder)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Try on ZSky AI](https://img.shields.io/badge/Try%20on-ZSky%20AI-blueviolet)](https://zsky.ai)

An interactive CLI prompt builder for AI image generation. Generate creative, detailed prompts ready for Stable Diffusion, Midjourney, DALL-E, or any AI image platform.

## Features

- **Interactive mode** &mdash; guided selection of subject, style, mood, lighting, and camera angle
- **50+ subjects**, 30+ styles, 20+ moods, 15+ lighting options, 10+ camera angles
- **3 prompt tiers** &mdash; basic, detailed, and expert-level output
- **Random generation** &mdash; instant creative inspiration with `--random`
- **Clipboard support** &mdash; copy the expert prompt directly with `--copy`
- **Colorful terminal UI** built with Chalk

## Installation

```bash
npm install -g zskyai-prompt-builder
```

Or run directly with npx:

```bash
npx zskyai-prompt-builder
```

## Usage

### Interactive Mode

```bash
zskyai-prompt
```

Walk through each prompt component step by step:

```
? Choose a subject: a cyberpunk samurai
? Choose an art style: oil painting
? Choose a mood: dramatic
? Choose lighting: neon glow
? Choose camera angle: low angle shot
```

### Random Prompt

```bash
zskyai-prompt --random
```

Instantly generates a random combination:

```
  Randomly selected components:
    Subject:  a mechanical whale
    Style:    ukiyo-e
    Mood:     ethereal
    Lighting: bioluminescent
    Camera:   drone aerial

  --- Basic Prompt ---
  a mechanical whale, ukiyo-e style

  --- Detailed Prompt ---
  a mechanical whale, ukiyo-e style, ethereal mood, bioluminescent lighting, drone aerial

  --- Expert Prompt ---
  a mechanical whale, rendered in ukiyo-e style. The scene conveys a ethereal
  atmosphere with bioluminescent lighting. Captured from a drone aerial perspective.
  Highly detailed, professional quality, 8K resolution, masterpiece composition.
```

### Copy to Clipboard

```bash
zskyai-prompt --random --copy
```

The expert-level prompt is copied to your clipboard, ready to paste into any AI image generator.

### Help

```bash
zskyai-prompt --help
```

## Options

| Flag | Short | Description |
|------|-------|-------------|
| `--random` | `-r` | Generate a fully random prompt |
| `--copy` | `-c` | Copy expert prompt to clipboard |
| `--help` | `-h` | Show help message |

## Prompt Tiers

| Tier | Description | Example |
|------|-------------|---------|
| **Basic** | Subject + style only | `a lone astronaut, photorealistic style` |
| **Detailed** | All five components | `a lone astronaut, photorealistic style, serene mood, golden hour lighting, wide angle lens` |
| **Expert** | Full natural-language prompt with quality modifiers | `a lone astronaut, rendered in photorealistic style. The scene conveys a serene atmosphere with golden hour lighting. Captured from a wide angle lens perspective. Highly detailed, professional quality, 8K resolution, masterpiece composition.` |

## Use with ZSky AI

This tool pairs perfectly with [ZSky AI](https://zsky.ai) for generating stunning AI images. Copy your expert prompt and paste it directly into ZSky AI's image generator for the best results.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-styles`)
3. Commit your changes (`git commit -am 'Add new art styles'`)
4. Push to the branch (`git push origin feature/new-styles`)
5. Open a Pull Request

## License

MIT License. See [LICENSE](LICENSE) for details.

---

Built with care by [ZSky AI](https://zsky.ai)
