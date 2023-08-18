---
title: Provenance
description: What's under the hood ...
---

These reference pages provide in-depth provenance on the processes in each module. Detailing the input and output file format, the execution command, and any reference data.

---

## Reference Genome
For this initial version of the MGP1000, the reference genome that will be used is GRCh38 (i.e. hg38).
All modules of the pipeline are currently only designed to utilize this version. Newer version may eventually be considered if tool-specific reference files can be regenerated upon it.
All reference files are provided with the repository and are stored within the `references/hg38` directory.

The core reference file `Homo_sapiens_assembly38.fasta` was sourced from the Broad Institute's publicly available hg38 reference [resource](https://console.cloud.google.com/storage/browser/genomics-public-data/resources/broad/hg38/v0).
This build includes all autosomes, both sex chromosomes, mitochondrial DNA contig, EBV DNA contig, all random/unplaced/alt/decoy contigs, and all HLA contigs.

---

## Preprocessing 🔵

### Output 🏆
The quality control metrics detailed in `*.alfred.qc.json.gz` can be viewed interactively by uploading the file to the [Alfred | GEAR Genomics GUI](https://www.gear-genomics.com/alfred/). Otherwise, a breadth of ## alignment QC metrics is tabulated in `*.alfred.qc.summary.txt` which can be easily aggregated per sample for data analysis.

### Tools 🛠️
* [GATK - RevertSam (Picard)](https://gatk.broadinstitute.org/hc/en-us/articles/360042914631-RevertSam-Picard-)
* [Biobambam2 - bamtofastq](https://gitlab.com/german.tischler/biobambam2)
* [Trimmomatic - PE](http://www.usadellab.org/cms/index.php?page=trimmomatic)
* [FastQC](https://www.bioinformatics.babraham.ac.uk/projects/fastqc/)
* [BWA - mem](http://bio-bwa.sourceforge.net/bwa.shtml)
* [Samtools - sort](https://www.htslib.org/doc/samtools-sort.html)
* [Samtools - collate](https://www.htslib.org/doc/samtools-collate.html)
* [Samtools - fixmate](https://www.htslib.org/doc/samtools-fixmate.html)
* [Samtools - markdup](https://www.htslib.org/doc/samtools-markdup.html)
* [ABRA2](https://github.com/mozack/abra2)
* [GATK - DownsampleSam (Picard)](https://gatk.broadinstitute.org/hc/en-us/articles/360042913891-DownsampleSam-Picard-)
* [GATK - BaseRecalibrator](https://gatk.broadinstitute.org/hc/en-us/articles/360042477672-BaseRecalibrator)
* [GATK - ApplyBQSR](https://gatk.broadinstitute.org/hc/en-us/articles/360042476852-ApplyBQSR)
* [Alfred - qc](https://www.gear-genomics.com/docs/alfred/cli/#command-line-interfact-for-bam-quality-control)

---

## Germline 🟢

### Output 🏆
The output germline VCF contains both SNPs and InDels with default DeepVariant [award-winning machine-leaning based filtering](https://github.com/google/deepvariant#why-use-deepvariant). The admixture estimations are found in the `*.fastngsadmix.23.qopt`. As described [here](http://www.popgen.dk/software/index.php/FastNGSadmix#Outputs), the first two rows have the names of the reference populations estimated and the converged upon estimates, and then 100 rows with the bootstrapping estimates.

### Tools 🛠️
* [DeepVariant](https://github.com/google/deepvariant)
* [GATK - SortVcf](https://gatk.broadinstitute.org/hc/en-us/articles/9570450655515-SortSam-Picard-)
* [GATK - SelectVariants](https://gatk.broadinstitute.org/hc/en-us/articles/9570332289307-SelectVariants)
* [ANGSD](http://www.popgen.dk/angsd/index.php/ANGSD)
* [fastNGSadmix](http://www.popgen.dk/software/index.php/FastNGSadmix)

---

## Somatic ⚫️

### Output 🏆
The consensus *SNVs* and *InDels* are output in mutation tables. These tab-delimited `*.hq.union.consensus.somatic.[snv|indel].txt.gz` files contain the union of all variants from all callers, with consensus records annotated and caller-specific VCF metrics reported. There are no other filters applied than the default recommended by each caller. For each consensus record, the median VAF across all reporting callers is output.

The consensus *SVs* are output in BEDPE format. This paired breakpoint `*.hq.union.consensus.somatic.sv.bedpe` file contains the union of all variants from all callers, with consensus breakpoints being merged using a [comprehensive coordinate-based merge / join of junctions](http://mskilab.com/gGnome/tutorial.html#Junction_overlaps_and_merges) if within 1000bp. The breakpoints from `IgCaller` that are output in `*.igcaller.oncogenic.rearrangements.tsv` are integrated using a simple filter of `Score >= 5` & `'Reads in normal' <= 4` & `'Count in PoN' <= 5`. The DUP and DEL breakpoints from `Manta`, `DELLY2`, and `SvABA` are post-filtered for reduction of FPs using `duphold` which annotates these records with [depth of coverage change across the breakpoints](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6479422/). Records are then filtered using `DHFFC>0.7` for `DEL` and `DHBFC<1.3` for `DUP`.

The consensus *CNVs* are output in BED format. This segmented `*.hq.union.consensus.somatic.cnv.bed` file contains the union coverage of copy number segments from both callers. Specifically, there are columns reporting the total copy number, and major/minor allele copy number per tool at each potential segment.


### Tools 🛠️
* [Conpair](https://github.com/nygenome/Conpair)
* [Battenberg](https://github.com/pblaney/battenberg)
* [FACETS](https://github.com/IARCbioinfo/facets-nf)
* [Manta](https://github.com/Illumina/manta)
* [SvABA](https://github.com/walaj/svaba)
* [DELLY2](https://github.com/dellytools/delly)
* [IgCaller](https://github.com/ferrannadeu/IgCaller)
* [Mutect2](https://gatk.broadinstitute.org/hc/en-us/articles/9570422171291-Mutect2)
* [Strelka2](https://github.com/Illumina/strelka)
* [VarScan2](http://dkoboldt.github.io/varscan/)
* [alleleCounter](https://github.com/cancerit/alleleCount)
* [Samtools](https://www.htslib.org/doc/samtools.html)
* [BCFtools](https://samtools.github.io/bcftools/bcftools.html)
* [duphold](https://github.com/brentp/duphold)
* [bam-readcount](https://github.com/genome/bam-readcount)
* [BEDtools](https://bedtools.readthedocs.io/en/latest/)
* [BEDOPS](https://bedops.readthedocs.io/en/latest/)
* [fragCounter](https://github.com/mskilab-org/fragCounter)
* [gGnome](https://github.com/mskilab-org/gGnome)
* [CaVEMan](https://github.com/cancerit/cgpCaVEManWrapper)
* [Telomerecat](https://github.com/cancerit/telomerecat)
* [TelomereHunter](https://www.dkfz.de/en/applied-bioinformatics/telomerehunter/telomerehunter.html)

---
