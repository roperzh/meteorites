# Meteorite landings on Planet Earth

This is a demo project demonstrating how to setup a pipeline to build and use static vector tiles as described in the accompanying [blog post](https://www.monades.dev/building-interactive-maps-with-statically-generated-vector-tiles/).

Check out the live demo [here](https://meteorites.monades.dev/)!

## Setup

### Dependencies

Make sure you have installed:

- [`tippecanoe`](https://github.com/mapbox/tippecanoe)
- [`ogr2ogr`](https://gdal.org/ogr2ogr.html)
- [Node.js](https://nodejs.org/en/)

### Building tiles

Use `artifacts/Makefile` to build the tiles:

```bash
TILES_HOST=https://my-host.com make -C artifacts
```

This downloads the necessary data, cleans up and generates a `tiles` folder in the project root
containing a nested directory structure with the tiles. 

If you don't provide a `TILES_HOST`, `http://localhost:5000` will be used by default.

Once you have the files downloaded, it's generally faster to just run the `build-map-tiles` command:

```
TILES_HOST=https://my-host.com make build-map-tiles -C artifacts
```

### Development flow

You can start a dev server on `http://localhost:5000` by running the `dev-server.js` file on the root.

```bash
node dev-server.js
```

The script serves map tiles with the correct `Content-Type` and
`Content-Encoding` headers so you can experiment and tweak the build pipeline
locally.

