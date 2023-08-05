---
title: Usage of the Pipeline Modules
description: Select your racetrack!
---

The MGP1000 consists of 3 scripts that are used to execute the modules.
* `preprocessing.nf`
* `germline.nf`
* `somatic.nf`

There are two methods for running each module in the pipeline: directly from the current environment or batch submission via a wrapper script (more on this later).

In both scenarios Nextflow performs all the job scheduling/submitting by interfacing with the HPC's native job executor.

Currently supported executors:
* [Slurm](https://slurm.schedmd.com/sbatch.html)
* [LSF](https://www.ibm.com/docs/en/spectrum-lsf/10.1.0?topic=reference-bsub)

:::tip[Don't see yours?]
User-specific configurations are possible for any of these [executors](https://www.nextflow.io/docs/latest/executor.html).

Feel free to [contact](https://github.com/pblaney/mgp1000/tree/master#contact) for help in development.
:::

## Quickstart Demo ⚡️
A quick demo of running the Preprocessing module and sanity check of the installation:

```sh
nextflow run preprocessing.nf \
	--run_id demo \
	--input_format fastq \
	--input_dir tests/ \
	-profile preprocessing
```
This command will run the Preprocessing module in the foreground using `singularity` containers and `slurm` execution manager (by default, `lsf` also available via `--executor`).

:::note
This demo should run quickly, however you can add the flag `-bg` to execute the jobs in the background.
:::

---

## Preprocessing 🟢
Placeholder for short description

Placeholder for image of module flowchart

### Use-cases 🔍
Below are a series of common use-cases and example code snippets of `nextflow run` commands that execute the pipeline module.

**The most common use-case:** alignment of paired-end FASTQs
```sh
nextflow run preprocessing.nf \
  -bg \
  --run_id batch1 \
  --input_format fastq \
  --email user@example.com \
  -profile preprocessing
```

**The second most common use-case:** alignment to hg38 of previously hg19-aligned BAMs
```sh
nextflow run preprocessing.nf \
  -bg \
  --run_id batch2 \
  --input_format bam \
  --email user@example.com \
  -profile preprocessing
```

**The thrid most common use-case:** quality-control analysis on previously hg38-aligned BAMs
```sh
nextflow run preprocessing.nf \
  -bg \
  --run_id batch3 \
  --input_format bam \
  --qc_only yes \
  --email user@example.com \
  -profile preprocessing
```

**The fourth most common use-case:** alignment of lane split paired-end FASTQs
```sh
nextflow run preprocessing.nf \
  -bg \
  --run_id batch4 \
  --input_format fastq \
  --lane_split yes \
  --email user@example.com \
  -profile preprocessing
```

### Script Parameters ⚙️

#### Mandatory Arguements

###### `--run_id`
> Unique identifier for pipeline run

###### `--input_format`
> Format of input files
>
> Default: `fastq` | Available: `fastq`, `bam`

###### `-profile`
> Configuration profile to use, must use `preprocessing`

#### Optional Arguments

###### `-bg`
> Runs the pipeline processes in the background, this ption should be included if deploying pipeline with real data set so processes will not be cut if user disconnects from deployment environment

###### `-resume`
> Successfully completed tasks are cached so that if the pipeline stops prematurely the previously completed tasks are skipped while maintaining their output

###### `--lane_split`
> Determines if input FASTQs are lane split per R1/R2
>
> Default: `no` | Available: `yes`, `no`

###### `--input_dir`
> Directory that holds input FASTQs or BAMs, this should be given as an absolute path
>
> Default: `input/`

###### `--output_dir`
> Directory that will hold all output files, this should be given as an absolute path
>
> Default: `output/`

###### `--email`
> Email address to send workflow completion/stoppage notification

###### `--seq_protocol`
> Sequencing protocol of the input, WGS for whole-genome and WES for whole-exome
>
> Default: `WGS` | Available: `WGS`, `WES`

###### `--cpus`
> Globally set the number of cpus to be allocated

###### `--memory`
> Globally set the amount of memory to be allocated, written as `##.GB` or `##.MB`

###### `--queue_size`
> Set max number of tasks the pipeline will launch
>
> Default: `100`

###### `--executor`
> Set the job executor for the run
>
> Default: `slurm` | Available: `local`, `lsf`, `slurm`

###### `--help`
> Prints help message

DIRECT USERS TO PREPROCESSING OUTPUT GUIDE

---

## Germline 🔵
Placeholder for short description

Placeholder for image of module flowchart

### Use-cases 🔍
Below are a series of common use-cases and example code snippets of `nextflow run` commands that execute the pipeline module.

**The most common use-case:** run full germline analysis (calling + admixture)
```sh
nextflow run germline.nf \
  -bg \
  --run_id batch1 \
  --sample_sheet wgs_samples.csv \
  --email user@example.com \
  -profile germline
```

**The most common use-case:** run only germline variant calling
```sh
nextflow run germline.nf \
  -bg \
  --run_id batch2 \
  --sample_sheet wgs_samples.csv \
  --fastngsadmix off \
  --email user@example.com \
  -profile germline
```

**The third common use-case:** run only admixture likelihood estimation
```sh
nextflow run germline.nf \
  -bg \
  --run_id batch3 \
  --sample_sheet wgs_samples.csv \
  --deepvariant off \
  --email user@example.com \
  -profile germline
```

### Script Parameters ⚙️

#### Mandatory Arguements

###### `--run_id`
> Unique identifier for pipeline run

###### `--sample_sheet`
> CSV file containing the list of samples where the first column designates the filename of the normal sample, the second column for the filename of the matched tumor sample

###### `-profile`
> Configuration profile to use, must use `germline`

#### Optional Arguments

###### `-bg`
> Runs the pipeline processes in the background, this ption should be included if deploying pipeline with real data set so processes will not be cut if user disconnects from deployment environment

###### `-resume`
> Successfully completed tasks are cached so that if the pipeline stops prematurely the previously completed tasks are skipped while maintaining their output

###### `--input_dir`
> Directory that holds input FASTQs or BAMs, this should be given as an absolute path
>
> Default: `input/`

###### `--output_dir`
> Directory that will hold all output files, this should be given as an absolute path
>
> Default: `output/`

###### `--email`
> Email address to send workflow completion/stoppage notification

###### `--seq_protocol`
> Sequencing protocol of the input, WGS for whole-genome and WES for whole-exome
>
> Default: `WGS` | Available: `WGS`, `WES`

###### `--deepvariant`
> Indicates whether or not to run DeepVariant workflow
>
> Default: `on` | Available: `off`, `on`

###### `--fastngsadmix`
> Indicates whether or not to run fastNGSadmix workflow
>
> Default: `on` | Available: `off`, `on`

###### `--cpus`
> Globally set the number of cpus to be allocated

###### `--memory`
> Globally set the amount of memory to be allocated, written as `##.GB` or `##.MB`

###### `--queue_size`
> Set max number of tasks the pipeline will launch
>
> Default: `100`

###### `--executor`
> Set the job executor for the run
>
> Default: `slurm` | Available: `local`, `lsf`, `slurm`

###### `--help`
> Prints help message

DIRECT USERS TO GERMLINE OUTPUT GUIDE

---

## Somatic ⚫️
Placeholder for concise descriptor of default and modularity

Placeholder for image of module flowchart

### Use-cases 🔍
Below are a series of common use-cases and example code snippets of `nextflow run` commands that execute the pipeline module.

**The most common use-case:** run full somatic analysis (`snv` | `indel` | `cnv` | `sv` )
```sh
nextflow run somatic.nf \
  -bg \
  --run_id batch1 \
  --sample_sheet wgs_samples.csv \
  --email user@example.com \
  -profile somatic
```


### Script Parameters ⚙️

#### Mandatory Arguements

###### `--run_id`
> Unique identifier for pipeline run

###### `--sample_sheet`
> CSV file containing the list of samples where the first column designates the filename of the normal sample, the second column for the filename of the matched tumor sample

###### `-profile`
> Configuration profile to use, must use `somatic`

#### Optional Arguments

###### `-bg`
> Runs the pipeline processes in the background, this ption should be included if deploying pipeline with real data set so processes will not be cut if user disconnects from deployment environment

###### `-resume`
> Successfully completed tasks are cached so that if the pipeline stops prematurely the previously completed tasks are skipped while maintaining their output

###### `--input_dir`
> Directory that holds input FASTQs or BAMs, this should be given as an absolute path
>
> Default: `input/`

###### `--output_dir`
> Directory that will hold all output files, this should be given as an absolute path
>
> Default: `output/`

###### `--email`
> Email address to send workflow completion/stoppage notification

###### `--mutect_ref_vcf_concatenated`
> Indicates whether or not the gnomAD allele frequency reference VCF used for MuTect2 processes has been concatenated, this will be done in a process of the pipeline if it has not, this does not need to be done for every separate run after the first
>
> Default: `no` | Available: `yes`, `no`

###### `--battenberg_ref_cached`
> Indicates whether or not the reference files used for Battenberg have been downloaded/cached locally, this will be done in a process of the pipeline if it has not, this does not need to be done for every separate run after the first
>
> Default: `no` | Available: `yes`, `no`

###### `--cpus`
> Globally set the number of cpus to be allocated

###### `--memory`
> Globally set the amount of memory to be allocated, written as `##.GB` or `##.MB`

###### `--queue_size`
> Set max number of tasks the pipeline will launch
>
> Default: `100`

###### `--executor`
> Set the job executor for the run
>
> Default: `slurm` | Available: `local`, `lsf`, `slurm`

###### `--help`
> Prints help message

#### Toolbox Arguments

###### `--battenberg`
> Indicates whether or not to use this tool
>
> Default: `on` | Available: `off`, `on`

###### `--battenberg`
> Indicates whether or not to use this tool
>
> Default: `on` | Available: `off`, `on`

###### `--battenberg_min_depth`
> Manually set the minimum read depth in the normal sample for SNP filtering in BAF calculations, default is for 30x coverage
>
> Default: `10`

###### `--battenberg_preset_rho_psi`
> Wish to manually set the rho/psi for this run? If TRUE, must set both rho and psi
>
> Default: `FALSE` | Available: `TRUE`, `FALSE`

###### `--battenberg_preset_rho`
> Manually set the value of rho (purity)
>
> Default: `NA`

###### `--battenberg_preset_psi`
> Manually set the value of psi (ploidy)
>
> Default: `NA`

###### `--facets`
> Indicates whether or not to use this tool
>
> Default: `on` | Available: `off`, `on`

###### `--facets_min_depth`
> Manually set the minimum read depth in the normal sample for SNP filtering in BAF calculations, default is for 30x coverage
>
> Default: `20`

###### `--manta`
> Indicates whether or not to use this tool
>
> Default: `on` | Available: `off`, `on`

###### `--svaba`
> Indicates whether or not to use this tool
>
> Default: `on` | Available: `off`, `on`

###### `--delly`
> Indicates whether or not to use this tool
>
> Default: `on` | Available: `off`, `on`

###### `--delly_strict`
> Enforce stricter thresholds for calling SVs with DELLY to overcome libraries with extraordinary number of interchromosomal reads
>
> Default: `off` | Available: `on`, `off`

###### `--igcaller`
> Indicates whether or not to use this tool
>
> Default: `on` | Available: `off`, `on`

###### `--varscan`
> Indicates whether or not to use this tool
>
> Default: `on` | Available: `off`, `on`

###### `--mutect`
> Indicates whether or not to use this tool
>
> Default: `on` | Available: `off`, `on`

###### `--strelka`
> Indicates whether or not to use this tool
>
> Default: `on` | Available: `off`, `on`

###### `--conpair`
> Indicates whether or not to use this tool
>
> Default: `on` | Available: `off`, `on`

###### `--conpair_min_cov`
> Manually set the minimum coverage
>
> Default: `10`

###### `--fragcounter`
> Indicates whether or not to use this tool
>
> Default: `on` | Available: `off`, `on`

###### `--telomerecat`
> Indicates whether or not to use this tool
>
> Default: `off` | Available: `on`, `off`

###### `--telomerehunter`
> Indicates whether or not to use this tool
>
> Default: `off` | Available: `on`, `off`

###### `--caveman`
> Indicates whether or not to use this tool
>
> EXPERIMENTAL! Requires many process directories and only calls in WES targets
>
> Default: `off` | Available: `on`, `off`

DIRECT USERS TO SOMATIC OUTPUT GUIDE
