[![Actions Status](https://github.com/bigeasy/mingle/workflows/Node%20CI/badge.svg)](https://github.com/bigeasy/mingle/actions)
[![codecov](https://codecov.io/gh/bigeasy/mingle/branch/master/graph/badge.svg)](https://codecov.io/gh/bigeasy/mingle)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Flexible service discovery for hosted Node.js applications.

| What          | Where                                         |
| --- | --- |
| Discussion    | https://github.com/bigeasy/mingle/issues/1    |
| Documentation | https://bigeasy.github.io/mingle              |
| Source        | https://github.com/bigeasy/mingle             |
| Issues        | https://github.com/bigeasy/mingle/issues      |
| CI            | https://travis-ci.org/bigeasy/mingle          |
| Coverage:     | https://codecov.io/gh/bigeasy/mingle          |
| License:      | MIT                                           |


Mingle is divided into a handful of sub-projects for different service discovery
strategies.

 * [Kubernetes](https://github.com/bigeasy/mingle/tree/master/mingle.kubernetes)
&mdash; Pod discovery using the Kubernets API.
 * [SRV](https://github.com/bigeasy/mingle/tree/master/mingle.srv) &mdash;
 Service discovery using DNS SRV records.
 * [HTTP](https://github.com/bigeasy/mingle/tree/master/mingle.srv) &mdash;
 Service discovery using an HTTP endpoint.

If you would like to suggest a service discovery format, maybe Azure or GCP,
please open an issue GitHub.
