[![Build and Test](https://github.com/dauom/manga-spread-merger-ext/actions/workflows/main.yml/badge.svg)](https://github.com/dauom/manga-spread-merger-ext/actions/workflows/main.yml)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

<p align="center">
  <img width="48" height="48" src="images/ext_icon/merge48.png" alt="Extension icon" />
</p>

# Manga Spread Merger Extension

A browser extension that helps manga readers join/merge two-page spreads into one in websites that don't do that (such as mangaplus).

## Features
- Easy to use; one click to merge an image and the next one.
- Supported manga sites:
   * Mangaplus (vertical reading mode).

## Installation

>TODO(mouad): add releases and installation info.

## Usage

Press ctrl+shift and click on the image you want to merge with the next one.

<p align="center">
  <img src="images/docs/before_after.png" alt="Before and After screenshot from MangaPlus" />
</p>

## Development

The extension is written in typescript and built using Parcel. It also uses ESLint with Google's Typescript style guide rules for linting.

Using the development server, or the build command in Yarn, the resulting extension will be in `dist/` directory.

### Pre-requisites

You will need to install NodeJS, NPM, and Yarn package manager.

### Installing dependencies

To install the dependencies, run: `yarn install` command.

### Starting up developpment server

To start the developpment server, run: `yarn run watch`.

This will spin up a new Firefox window that you can use to test the extension.

You can also inspect the resulting extension assets in `dist/` directory.

### Building the extension .zip file

To build the extension .zip file, run the command: `yarn run build-zip`. This command will result in a zip file in `web-ext-artifacts/` directory.
