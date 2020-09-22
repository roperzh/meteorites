# Meteorite landings on Planet Earth

This is a demo project demonstrating how to setup a pipeline to build and use static vector tiles as described in this [blog post](https://www.monades.dev/).

Check out the end result [here](https://meteorites.netlify.app/)!

## Setup

### Dependencies

Before you can do anything, make sure you have installed:

- [`tippecanoe`](https://github.com/mapbox/tippecanoe)
- [`ogr2ogr`](https://gdal.org/ogr2ogr.html)
- [Node.js](https://nodejs.org/en/)

### Building tiles

Use `artifacts/Makefile` to build the tiles:

```bash
TILES_HOST=https://my.host.com make -C artifacts
```

This downloads the necessary data, cleans up and generates a `tiles` folder in the project root
containing a nested directory structure with the tiles. 

If you don't provide a `TILES_HOST`, `http://localhost:5000` will be used by default.

Once you have the files downloaded, it's generally faster to just run the `build-map-tiles` command:

```
TILES_HOST=https://my.host.com make build-map-tiles -C artifacts
```

### Development flow

You can start a dev server by running the `dev-server.js` file on the root, it will start a development server and
serve the map tiles with the correct `Content-Type` and `Content-Encoding` headers so you can experiment and tweak
locally.

Generally, you will first start the server first with:

```bash
node dev-server.js
```

And then, modify the build as described in [Building tiles](#building-tiles) to experiment.


## Note

Since the sole purpose of this project is to help you create a pipeline to build static tiles, the built tiles are commited for two reasons:

1. I hope that by being able to explore the tiles without having to clone the repo and install all the dependencies you'll get a better understanding of what are you building
2. Hosting is a bit easier for me, since I can just take adventage of GitHub pages without having to do much else.

Generally you'll want to generate and host the tiles in a better place like Amazon S3.
