---
title: Introduction
description: A birds-eye view of the MGP1000
---

In order to analyze over one thousand matched tumor/normal whole-genome samples across multiple data centers in a consistent manner, a pipeline was created that leverages the workflow management, portability, and reproducibility of [Nextflow](http://www.nextflow.io/) in conjuction with [Singularity](https://sylabs.io/docs/).

The MGP1000 offers a singular, consistent, automated workflow that is portable and reproducible across different data centers with little effort or issues stemming from environment incompatibilities, version inconsistencies, missing dependencies, or a need to setup the necessary tools on a user's HPC infrastructure.

## Pipeline Workflow

The entire pipeline is divided into 3 modules: Preprocessing, Germline, and Somatic

 <img src="https://github.com/pblaney/mgp1000-docs/raw/main/src/assets/pipelineFlowArchitecture.png" alt="Pipeline Workflow">
