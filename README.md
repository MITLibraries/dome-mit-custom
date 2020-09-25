# Local Dome Customizations

This repository holds only the files necessary to change a stock DSpace
application into the Dome platform maintained by the MIT Libraries.

These files are meant to be unzipped on top of a stock DSpace 6.3 codebase.

## Local development

This is a rough approximation of what runs in production. Always check on the
staging server before promoting to production. It is currently using a
docker image that is quite a bit ahead of the official DSpace 6.3 release and
thus we'll likely run into problems with it for doing anything other than
cosmetic UI changes.

At the start of your dev session:

- `docker-compose up`
- `make sync`

Any time you make changes you want to see:

- `make sync`

If you broke things really bad and need to reset:

- delete your docker volumes and dspace container

## Future enhancements

- document how to load test data
