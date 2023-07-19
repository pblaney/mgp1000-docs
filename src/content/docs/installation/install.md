---
title: Deploying the Pipeline
description: A How-To for using the MGP1000
---

The pipeline was developed to be run on various HPCs without concern of environment incompatibilities, version issues, or missing dependencies. None of the commands require admin access or sudo to be completed. However, there are a few assumptions regarding initial setup of the pipeline but the required software should be readily available on nearly all HPC systems.

* `git`
* `make`, `wget`, `tar`, `zip`
* `java -version` (11 or later)
* `singularity` (confirmed usage on v3.1, v3.5.2, v3.7.1, v3.9.8)
* `nextflow` 

## Clone GitHub Repository

```
git clone https://github.com/pblaney/mgp1000.git
```
> This will take a few minutes to pull containers and reference data

## Prep the Pipeline for Usage

Unzip some reference files and create some additional directories for input files and logs.

```
make prep-pipeline
```