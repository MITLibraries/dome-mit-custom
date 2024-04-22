# Local Dome Customizations

This repository holds only the files necessary to change a stock DSpace
application into the Dome platform maintained by the MIT Libraries.

These files are meant to be unzipped on top of a stock DSpace v6.4 codebase.


## Local development

_Local development may not be possible currently - this section should be read_
_skeptically. An update is in progress, see [ENGX-264](https://mitlibraries.atlassian.net/browse/ENGX-264)._

Local development is best done via Docker, using this general workflow:

1. From the [DSpace repository](https://github.com/DSpace/DSpace), download the [DSpace v6.4 release](https://github.com/DSpace/DSpace/releases/tag/dspace-6.4).
2. Copy the contents of this `dome-mit-custom` repository over the top of that
   branch, overwriting and adding files as needed. Something like `cp -R *`
   should work.
3. Follow the [standard Docker workflow](https://github.com/DSpace/DSpace/tree/dspace-6.4/dspace/src/main/docker-compose) for building and starting the
   application. It will appear by default at [localhost:8080/xmlui](localhost:8080/xmlui).


## Deploying to development or production

The process for deploying a branch to the development tier is:

1. Push the branch to this repository.
2. Create a release on the branch, whose value will be used during the deploy
   process.
3. Submit a JIRA ticket InfraEng team, letting them know that a deploy is
   needed. In the ticket, include the release number/tag, when you'd like the
   deployment done (during work hours or off work hours), and in which
   environment you'd like the deploy performed (dev1, stage, or production). The
   link to submit the ticket is: [MIT Libraries Service Portal: Configuration
   Change](https://mitlibraries.atlassian.net/servicedesk/customer/portal/8/group/47/create/193).

   Infrastructure will update the AWS environment and perform the deploy with
   Ansible. This process involves recompiling DSpace and will typically take
   around 30 minutes. No developer involvement is needed in this process.
   However, if you would like to review the process documentation, it can be
   found in the [MITLibraries/AWS-ansible: dome-dspace6](https://github.com/MITLibraries/AWS-ansible/tree/main/dome-dspace6) repository
   app folder.


## Theme

The theme for this application, `mit-fol`, is based on the MIT Libraries'
design system. Where possible, we should copy the stylesheets from that system
without alteration, and then store customizations in the basic `_style.scss`
file.
