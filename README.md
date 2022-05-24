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

head file1 file2
  Display content from both the files.
```

### NAME
`tail -- display the last part of a file`

### SYNOPSIS
`tail [-r] [-q] [-c # | -n #] [file ...]`

### DESCRIPTION
```
tail file 
  The tail utility displays the contents from end of file. 

tail -n file  
  The -n option displays specified number of lines from given file.

tail -c file  
  The -c option displays specified byte of data from given file.

tail -r file
  The -r option causes the input to be displayed in reverse order, by line.  Additionally, this option changes the meaning of the -b, -c and -n options.  When the -r option is specified, these options specify the number of bytes, lines or 512-byte blocks to display, instead of the bytes, lines or blocks from the beginning or end of the input from which to begin the display. The default for the -r option is to display all of the input.

tail -q file
  Suppresses printing of headers when multiple files are being examined.
```