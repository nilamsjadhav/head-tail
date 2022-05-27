### HEAD
`Display first lines of a file`

### SYNOPSIS
`head [-n lines | -c bytes] [file ...]`

### DESCRIPTION

* head file 

  This filter displays the first count lines or bytes of each of the specified files. If count is omitted it defaults to 10. it gives usage if no file specified. 

* head -n file 

  The -n option displays specified number of lines from given file.

* head -c file 

  The -c option displays specified byte of data from given file.

* head [file...]

  Display content of given files.

---
### TAIL
`Display the last part of a file`

### SYNOPSIS
`tail [-r] [-q] [-c # | -n #] [file ...]`

### DESCRIPTION

* tail file 

  The tail utility displays the contents from end of file. 

* tail -n file  

  The -n option displays specified number of lines from given file.

* tail -c file  

  The -c option displays specified byte of data from given file.

* tail -r file

  The -r option causes the input to be displayed in reverse order, by line.

* tail -q file

  Suppresses printing of headers when multiple files are being examined.

* tail [file...]

  Display content of given files.