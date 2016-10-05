<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
nchnls = 2
0dbfs = 1
ksmps = 256
sr = 44100

instr 1

iport init 8888
kvarChanged init 0
ktrigger init 0

kvar, Sstring websocket iport

if kvarChanged != kvar then
kvarChanged = kvar
ktrigger = 1
Sscore sprintfk {{i 2 0 -1 %s}}, Sstring
endif

scoreline Sscore, ktrigger
ktrigger = 0

endin

instr 2

prints p4
Sstring = p4
ires compilestr Sstring
scoreline_i "i 3 0 3 .2 415"
turnoff
endin

</CsInstruments>
<CsScore>
i1 0 100
</CsScore>
</CsoundSynthesizer>
