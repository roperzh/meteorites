.DEFAULT_GOAL := build

download:
	curl -L https://data.nasa.gov/resource/gh4g-9sfh.geojson -o meteorites.geojson
	curl -L https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip -o countries.zip
	curl -L https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_1_states_provinces.zip -o states_provinces.zip
	unzip -o countries.zip
	unzip -o states_provinces.zip

prepare-data:
	ogr2ogr -f GeoJSON countries.geojson ne_10m_admin_0_countries.shp
	ogr2ogr -f GeoJSON states_provinces.geojson ne_10m_admin_1_states_provinces.shp

build-map-tiles:
	rm -rf ../tiles
	tippecanoe --force --exclude-all -z6 -o countries.mbtiles --coalesce-densest-as-needed countries.geojson
	tippecanoe --force --exclude-all -z6 -Z4 -o states_provinces.mbtiles --coalesce-densest-as-needed states_provinces.geojson
	tippecanoe --force -z6 -r1 --cluster-distance=30 -o meteorites.mbtiles meteorites.geojson 
	tile-join -e ../tiles countries.mbtiles states_provinces.mbtiles meteorites.mbtiles
	node clean-tiles-metadata.js 

build: download prepare-data build-map-tiles

