```nasm
mov eax,[ebx+ecx*4-0x10]
lea esi,[eax+eax*2]
rol esi,5
jmp eax
```
