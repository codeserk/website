import 'reflect-metadata'
import * as path from 'path'

import { media } from '@codeserk/press-media'
import { ImageResizeKernel, MediaResolution } from '@codeserk/press-core'
import { ImageBlendColorMode } from '@codeserk/press-core/build/media/src/image/interfaces/transform-options.interface'
import { lightenDarkenColor } from '../utils/color'

const service = media.withConfig({
  downloadDir: path.resolve(__dirname, '..', 'static'),
  baseUrl: '/media/',
  image: {
    resolutions: {
      placeholder: 32,
      xs: 200,
      sm: 320,
      md: 640,
      lg: 1200,
    },
  },
}).service

/**
 * Tints an image.
 *
 * @param name
 * @param color
 */
async function transformImage(theme: string, name: string, color: string): Promise<void> {
  await service.processImage(path.resolve(__dirname, '..', 'assets/img/scene/', `${name}.png`), {
    force: true,
    resolution: MediaResolution.Original,
    resizeKernel: ImageResizeKernel.Nearest,
    outputDir: `scene/${theme}`,
    outputName: `${name}`,
    transform: {
      blendColor: {
        color,
        mode: ImageBlendColorMode.Multiply,
        masked: true,
      },
    },
  })
}

async function createTheme(name: string, color: string): Promise<void> {
  await Promise.all([
    transformImage(name, 'background', lightenDarkenColor(color, 51)),
    transformImage(name, 'clouds-far', color),
    transformImage(name, 'clouds-near', color),
    transformImage(name, 'moon', lightenDarkenColor(color, 102)),
    transformImage(name, 'mountain-far-cover', color),
    transformImage(name, 'mountain-far', color),
    transformImage(name, 'mountains-near', color),
    transformImage(name, 'trees-far', color),
    transformImage(name, 'trees-near', color),
  ])
}

async function exec() {
  // Create only night color for now.
  // await Promise.all([createTheme('.', '#AA6B8C')])
  await Promise.all([createTheme('.', '#575FA2')])
}

exec()
