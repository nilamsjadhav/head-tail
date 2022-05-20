### NAME
`head -- display first lines of a file`

### SYNOPSIS
`head [-n lines | -c bytes] [file ...]`

### DESCRIPTION
```
head file 
  This filter displays the first count lines or bytes of each of the specified files. If count is omitted it defaults to 10. it gives usage if no file specified. 

head -n file  
  The -n option displays specified number of lines from given file.

head -c file  
  The -c option displays specified byte of data from given file.
```