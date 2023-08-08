---
title: Deploying the Pipeline
description: A How-To for using the MGP1000
---

The pipeline was developed to be run on various HPCs without concern of environment incompatibilities, version issues, or missing dependencies. None of the commands require admin access or sudo to be completed. However, there are a few assumptions regarding initial setup of the pipeline but the required software should be readily available on nearly all HPC systems.

* `git`
* `make`, `wget`, `tar`, `zip`
* `java -version` (11 or later)
* `singularity` (confirmed usage on v3.1, v3.5.2, v3.7.1, v3.9.8)
* `nextflow` (>=20.01.0)

---

## Clone GitHub Repository

```sh
git clone https://github.com/pblaney/mgp1000.git
```
:::note
This will take a few minutes to pull containers and reference data
:::

---

## Prep the Pipeline for Usage

Unzip some reference files and create some additional directories for input files and logs.

```sh
make prep-pipeline
```

### Having Trouble?

<details>
<summary>Need to install git-lfs ...</summary>
<br>
In an effort to containerize the pipeline further, all the necessary reference files and Singularity container images are maintained in the repository using Git's Large File Storage (LFS) extension.

# 

First, a quick test ...
```sh
git-lfs version
```
:::note
If this works, you're done! All is well and you can move on! If not, follow below ...
:::

# 

Install git-lfs Linux AMD64 binary executible file (v3.2.0). Other binary files available [here](https://github.com/git-lfs/git-lfs/releases)
```sh
make install-gitlfs-linuxamd64
```

# 

Move the `git-lfs` binary to a location on `$PATH`
```sh
mv git-lfs $HOME/bin
```

# 

Complete the install and configuration
```sh
git-lfs install
```

# 

Use `git-lfs` to complete the clone
```sh
git-lfs pull
```

</details>

<details>
<summary>Need to install Nextflow ...</summary>
<br>
It is always preferred to use your HPC's installed module of Nextflow. However, follow below for installation of the Nextflow binary. The most current version of Nextflow requires Java 11 or later. Therefore, the user may need to load this version of Java to complete the install.

```sh
make install-nextflow
```

# 

Move the `nextflow` binary to a location on `$PATH`
```sh
mv nextflow $HOME/bin
```

</details>

---
