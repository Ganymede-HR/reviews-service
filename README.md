# Reviews Service


## Tech Stack
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)
![k6 Badge](https://img.shields.io/badge/k6-7D64FF?logo=k6&logoColor=fff&style=for-the-badge)

## Table of Contents
- [Project Overview](#project-overview)
- [Performance & Optimizations](#performance--optimizations)

## Project Overview
> Redesign and develop a RESTful API, serving product rating & reviews data

> Optimize and scale the API to handle production level traffic with low latency and <1% error rates 

> Handled & ETL 10 million rows of data into Postgres

***

## Performance & Optimizations

### Requesting to Retrieve Meta Reviews Performance

  * Before - Utilizing 1 Server Instance & 1 DBMS Instance

    > Max RPS: 1100 clients/sec over 1 minute

    > Response Time: 1957ms

    > Error Rate: 0.1%

  | Max Before Load Balancing (Meta Reviews) |
  | :---: |
  | ![Before Load Balancing](/assets/LoaderioMetrics/getMetaMax.png) |

  * After - Utilizing a Load Balancer Instance with 2 Server Instances & 1 DBMS Instance

    > Max RPS: 2000 clients/sec over 1 minute

    > Response Time: 64ms

    > Error Rate: 0%

  | Max After Load Balancing (Meta Reviews) |
  | :---: |
  | ![After Load Balancing](/assets/LoaderioMetrics/maxMetaLoadBalancer.png) |

### Requesting to Retrieve Reviews Performance

  * Before - Utilizing 1 Server Instance & 1 DBMS Instance

    > Max RPS: 1000 clients/sec over 1 minute

    > Response Time: 1777ms

    > Error Rate: 0.1%

  | Max Before Load Balancing (Reviews) |
  | :---: |
  | ![Before Load Balancing](/assets/LoaderioMetrics/getReviewsMax.png) |

  * After - Utilizing a Load Balancer Instance with 2 Server Instances & 1 DBMS Instance

    > Max RPS: 2000 clients/sec over 1 minute

    > Response Time: 65ms

    > Error Rate: 0%

  | Max After Load Balancing (Reviews) |
  | :---: |
  | ![After Load Balancing](/assets/LoaderioMetrics/maxReviewsLoadBalancer.png) |

***

# Contributor

### Hazel Kimberly Carcido

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hazelkimberly/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hazelkimberly)
