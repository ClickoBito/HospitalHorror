PANDOC ?= pandoc

REPORTFILE := report_template.md
REQFILE := project.md
BUILDDIR := out

all: clean mkdir_out textemplate pdftemplate requirements

# create directory "out". pandoc might complain , if it doesn't exist
mkdir_out:
	mkdir ${BUILDDIR}

# convert the markdown template to latex
textemplate: ${REPORTFILE}
	$(PANDOC) -s -N -o ${BUILDDIR}/report.tex $<

# convert the markdown template to pdf
pdftemplate: ${REPORTFILE}
	$(PANDOC) -N -o ${BUILDDIR}/report.pdf $<

# convert the markdown template to word
#wordtemplate: report_template.md
#	$(PANDOC) -o out/report_template.docx $<

# convert the markdown requirements to pdf
requirements: ${REQFILE}
	$(PANDOC) -V colorlinks -o ${BUILDDIR}/project_meta_requirements.pdf $<

clean:
	rm -rf out
