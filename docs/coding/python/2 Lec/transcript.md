
1:50:39
all right this is cs50's Introduction to programming with python my name is David
1:50:45
men and this week we focus on conditionals conditionals or conditional statements in Python and in other
1:50:51
languages are this ability ility to ask questions and answer those questions in
1:50:56
order to decide do you want to execute this line of code or this line of code or this other line of code instead they
1:51:01
allow you to take the proverbial Forks in the road within your own code logically so how might we go about
1:51:08
making some of these decisions well it turns out that python comes with a lot of built-in Syntax for instance here are
1:51:14
just some of the symbols you can use in Python to ask questions admittedly mathematical questions but we'll start
1:51:19
there if only to keep the example simply simple early on this first symbol as you might know for math represents greater
1:51:26
than the second symbol might not look too familiar because we usually write it all as one thing on a piece of paper but
1:51:32
on a keyboard if you want to say greater than or equal to you'd use this symbol Instead This of course means less than
1:51:38
this means less than or equal to and this one's a bit of a curiosity we've seen in our look at functions and
1:51:45
variables how we were able to assign values to variables using a single equal
1:51:50
sign but that equal sign didn't repres represent equality it represented assignment from right to left that's
1:51:56
great because it solved that problem but it kind of left us in a bit of a bind because how do we now compare two things
1:52:01
left and right well in Python and in many languages you actually use two equal signs so two equal signs
1:52:08
represents equality comparing the thing on the left and the right one equal sign as always represents assignment copying
1:52:15
the thing from the right to the left lastly this last symbol represents not equal to so the exclamation point or
1:52:21
Bang uh followed by an equal sign means not equal to some value next to it well
1:52:28
to ask the questions using these symbols or any others we're going to need another keyword in Python and that
1:52:34
keyword quite simply as in English is if you can ask questions in Python code along the lines of if the answer to this
1:52:41
question is true then go ahead and execute this code for me so let's go ahead and write some of these examples
1:52:48
here I'm going to go over to VSS code and let's go ahead and create a program for called compare. the goal of which is
1:52:55
simply to write code that compares values and makes decisions based on those values let's go ahead and type
1:53:01
code of compare. py in order to create a brand new file called compare in which we'll start to express some of this
1:53:07
logic all right well what do we want to compare suppose we want to compare for the sake of discussion just a couple of
1:53:12
integers but we'd like those integers to come from the user so that we can make
1:53:17
uh decisions based on numbers we don't know the values of in advance well let's go ahead and do this as we've done in
1:53:23
the past let's declare a variable like X let's assign it equal to the return
1:53:29
value of the int function and pass to the int function the return value of the
1:53:34
input function asking the user a question like what's X question mark As we've done in the past let's do this one
1:53:40
more time with Y asking the user for the value of y and again uh converting that
1:53:47
ultimately to an INT as well so at this am of the story we have two variables X and Y
1:53:53
Each of which has values and ideally we should be able to now compare these values so suppose I want to make a
1:53:58
decision based on the values of these variables I'm going to use the keyword if and I'm going to use some of those
1:54:03
mathematical symbols to actually ask the question itself so how about this if x is less than y then let's go ahead and
1:54:11
just print as much Out quote unquote X is less than y so this isn't a very
1:54:16
interesting program yet I'm literally just stating the obvious based on the math but it's allowing me to introduce
1:54:22
some new syntax and exactly what is this syntax well it's this not just the keyword if which I've added here at the
1:54:29
start of line four but then I ask my question here x less than y x is one
1:54:34
variable on the left Y is one variable on the right and of course the less than sign is expressing the mathematical
1:54:39
question I have what I've highlighted here is technically called a Boolean expression a Boolean expression named
1:54:46
after a mathematician named bull is simply a question that has a yes or no answer or technically a true or false
1:54:53
answer and that's nice because if there's only two possible answers it's very easy for me and in turn the
1:54:59
computer to make a decision do this or don't do this thing now notice if you come from other languages you might
1:55:06
notice that I have not typed any parentheses they are not in fact necessary at least in this case in
1:55:11
Python but I have typed a colon at the end of the line and even more importantly at the next line I have
1:55:18
begun my line with some indentation hitting the space bar four times or just hitting tab once which will
1:55:23
automatically be converted to the same that indentation is what tells python that line five should only be executed
1:55:30
if the answer to line Four's question is in fact true so if x is less than y that
1:55:37
phrase will be printed thereafter well let's add a few more lines of code how about another question If X is greater
1:55:43
than y then let's go ahead and print that X is greater than y and let's do
1:55:49
one final question if x equals y then wait a minute what have I done wrong
1:55:56
here right a good eye here I don't want to assign y to x if x equals equals y is
1:56:01
how I express equality let's go ahead and print out X is equal to Y so I now
1:56:08
have a uh three conditions if you will one question asking X less than y one
1:56:14
asking X greater than y one asking xals equals y let's run the code well down
1:56:20
here in my terminal window I'm going to run python of pair. pi and hit enter what's X let's go with one what's y
1:56:26
let's go with two this should of course execute that first line of code and tell
1:56:31
me indeed that X is less than y exactly as I would expect there well what just
1:56:38
happened though in code well let's take a look perhaps at this same code uh visually particularly if you're a more
1:56:44
visual learner this I dare say is what just happened so what we're looking at here is a a flowchart it's a diagram of
1:56:51
this program's logic and more technically it shows the program's control flow that is the ability of you
1:56:58
and code to control the flow of a program generally from top to bottom in fact let me go ahead and zoom in on the
1:57:03
top of this flowchart and you'll see an oval at the very top that says quite literally start that is irrespective of
1:57:09
what shape or layout the diagram is is where your own thinking and logic should start when trying to wrap your mind
1:57:15
around this program notice that there's an arrow from start to this diamond shape and inside of that diamond is a
1:57:21
question a an expression X less than y and this shape just means based on the
1:57:26
answer to that question go left or go right specifically go left if the answer is true or go right if the answer is
1:57:34
false well the inputs I typed were one and two respectively for X and Y so of
1:57:40
course one is less than two so that's why my program printed out quote unquote
1:57:46
X is less than y but recall the code the code then proceeded to ask two more
1:57:52
questions is X greater than y is x equal equal to Y well the flowchart depicts
1:57:57
those questions too notice that no matter whether the question had an answer of true or false the arrows both
1:58:04
converge back down to this second diamond shape here and that second diamond shape asks the second question X
1:58:11
greater than y that too has a true or false answer so we go one way or the other but if x is 1 and Y is 2 then no
1:58:19
the answer is false one is not greater than y so so logically in the flowchart you follow the false Arrow this time and
1:58:25
notice along that false Arrow you don't print anything this time that's why we only saw one print out on the screen now
1:58:32
there was still a third question and this flowchart captures that as well the third Diamond asks x equals equals y now
1:58:38
that to has a false answer in this case because one of course does not equal equal Y and so we again follow the third
1:58:44
false Branch here and that leads us of course to stop and stop just indicates
1:58:49
that's it for the program so think that's correct and that particular flowchart does happen to represent the
1:58:58
actual code that I wrote so it's correct it does what it's supposed to do it answered the question correctly by
1:59:03
printing on the screen X less than y but what is perhaps poorly designed about it
1:59:09
let's make this first distinction it's not enough necessarily for the code that you write to be correct and do what you intend longer term especially as our
1:59:15
programs get longer and more sophisticated more complicated we're going to want them to be welld designed
1:59:21
too thoughts on in what way this program is arguably not welld
1:59:27
designed even though it's correct let's see here uh khed if I'm
1:59:32
saying that right your thoughts too many ifs I think is getting repetitive we can
1:59:37
make our code more concise maybe yeah it seems a little repetitive I'm asking if this if this if this and yet logically I
1:59:45
should know the answer to some of those later questions once I figure one out and in short if you look at this diagram
1:59:50
here notice that no matter matter whether I go left or I go right I'm always asking three questions no matter
1:59:57
what all of those arrows lead to the first the second and the third Diamond so I'm asking three questions no matter
2:00:04
whether any of those answers are true or false well how might I go about improving this well let me propose that we introduce another keyword to our
2:00:11
python vocabulary namely L if and this too is kind of a succinct one it's a conjunction of else if in English which
2:00:18
allows us to ask a question that takes into count whether or not a previous
2:00:24
question had a true or false answer well what do I mean by that well let me go back to my code here and let me propose
2:00:30
that we now improve upon this here by asking ourselves ultimately how can we
2:00:36
ask fewer questions and let me go ahead here and propose that instead of asking
2:00:42
if if if let's make these conditions potentially mutually exclusive that is
2:00:47
to say don't keep answering questions once we get back a true answer so I'm
2:00:53
going to change my code up here as follows instead of asking if if if I'm going to say if x less than y l if x
2:01:00
greater than y l if x equals equals y so
2:01:06
I'm going to implicitly just like an English take into account that I'm only going to keep a asking myself these
2:01:12
questions if I haven't yet gotten a true response think about the logic here the English if x is less than y on line four
2:01:21
print out out X is less than y well if that's the case you're done logically because if the English is saying if x
2:01:28
less than y else if x greater than y those are going to be mutually exclusive if the answer to the first question is
2:01:34
true you don't have to keep asking questions to which you already logically know the answer so let me go ahead now
2:01:40
and run this program and I think the behavior is going to be the same python of compare. Pi what's X let's do one
2:01:46
what's y let's do two x is less than y now honestly I didn't really notice a difference when I ran the program and
2:01:53
honestly my Mac my PC my phone nowadays are so darn fast that these kinds of
2:01:58
improvements aren't going to necessarily feel any faster until we're writing bigger faster programs but it's laying
2:02:05
the foundation for writing better code longer term now what is the Improvement I've just made well if previously my
2:02:11
diagram looked like this which was problematic in so far as I was asking
2:02:17
three questions no matter what even if I already figur out what I want to print on the screen this new version of the
2:02:23
program that says if L if L if might look a little something like this instead now it got a little wider that's
2:02:29
just because we drew the arrows to be a bit wider here but let's focus on just how many questions are getting asked let
2:02:34
me zoom in at the top as before and let me propose that we note that the start oval is at the very top and it's asking
2:02:41
us to ask one question first X less than y is one less than two but notice here
2:02:46
let me zoom out if one is indeed less than two we follow this long longer
2:02:52
Arrow the down Mark true we print out quote unquote X is less than y but then
2:02:58
we immediately follow this next arrow down to the icon that says stop so
2:03:04
that's what's implied by doing if L if L if if we get back a true answer right away to that first if we're going to
2:03:11
print out X is less than y and then stop we're logically at the end of the program so this picture is just
2:03:17
representing graphically what the code is actually doing but suppose I typed in
2:03:22
something else suppose that my code actually ran and I typed in two for x
2:03:27
and one for y that is to say the answer to the first question is now false but the answer to the second question is now
2:03:34
true because of course uh one uh two is greater than one well let's go back to
2:03:40
the diagram same as before we start at the very top where it says start the very first question up here now X less
2:03:46
than y is an answer of false because no two is not less than one so we follow
2:03:52
this arrow to the next question this diamond is X greater than y well yes 2
2:03:57
is greater than 1 so now we follow this left Arrow which is true we print out
2:04:03
quote unquote X is greater than y and then stop so what's the Improvement well
2:04:09
in the first case we got lucky and we only had to ask one question and boom we're done this time we had to asked two
2:04:15
questions but then boom we're done only if x happens to equal y do we actually
2:04:21
find our elves logically getting all the way down to this final L if in my code
2:04:27
and pictorially only if x is equal to Y do we find ourselves going all the way down to the third Diamond the third
2:04:34
question asking is it equal to y or not now hopefully the answer at that point
2:04:40
is not false we've included a false Arrow just so that the program itself is well defined but logically we shouldn't
2:04:47
actually be getting there anyway because it's got to be less than or greater than or equal to in this case well let me
2:04:53
pause here to see if there's any questions now either on the code version thereof here or on this diagramming of
2:04:59
that very same logic questions here on this control
2:05:06
flow uh AR we supposed to put an else at the end ah a good question and yes so
2:05:13
that's going to be my my third and Final Approach and if you don't mind let's pivot there right away identifying a
2:05:18
third keyword that indeed exists in Python that allow ows us to be even better at expressing this logic to
2:05:24
design this program even better and that's going to solve a particular problem so if I take us back to our code
2:05:31
here notice that what I've highlighted earlier L ifx equals equals y it's not
2:05:37
wrong to ask that question in fact if you're trying to be especially thorough it makes perfect sense to check if x is
2:05:43
less than y greater than y or equal to Y but why don't I need to ask this third
2:05:51
and and final question we don't need to ask if x is equal to Y anymore because
2:05:56
logically if the two conditionals evaluate to false there is only one um
2:06:04
conditional that will evaluate to true and that is X is equal to Y exactly if we're all pretty comfortable with math
2:06:10
and comparisons here of course X is either going to be less than y greater than y or equal to Y but once you rule
2:06:16
out the first two scenarios logically it's got to be the case that X must equal y if it wasn't the case that it's
2:06:22
less than or greater than so hope propos that we use this other keyword else and how do we use this well exactly as we
2:06:28
might in English let me go back to my code here and instead of bothering to ask the third and final question let's
2:06:34
not ask a question at all let's just have this catchall so to speak a final line of code that says else just assume
2:06:42
that X is equal to Y therefore printing it as well so what's the upside of that my code is still going to work exactly
2:06:48
the same and again my computer's so darn fast I don't even notice that it's working even faster than it was before
2:06:55
but we would notice these kinds of things if we were doing a lot more work a lot bigger programs here but let me
2:07:00
run python of compare. piy let's do for instance one and two still works for
2:07:06
that let's do two and one still works for that let's do one and one and it
2:07:11
indeed now works for that but in these cases now let's consider the path we just went down previously our diagram
2:07:18
when we had if L if L if in place looked a little something like this and notice
2:07:24
that again we might have asked one question or two or worst case three whole questions but we can do better
2:07:30
than that using else as hope proposed we can Whittle this diagram now down to this and even though it looks like the
2:07:36
diagram is getting bigger notice that it's having fewer uh building blocks inside of it there's fewer arrows and
2:07:42
there's fewer nodes in this picture let's start at the top now start leads us to the first question still X less
2:07:49
than y if the answer is true great we can say as much X is less than y and we can stop if it's not true if it's false
2:07:55
we can ask the next question X is greater than y true or false if it is great we can print X as greater than y
2:08:02
and stop else if it's not the case that X is greater than y the answer is false
2:08:07
we can just immediately logically say x is equal to Y we don't have to add the
2:08:12
third question at all we can just immediately conclude there so what's the implication here you can see with these
2:08:18
pictures a relative decrease in the comple it of a program the first one was very long and stringy with lots and lots
2:08:25
of questions unnecessarily ultimately the next one got a little shorter and this one's even shorter still and again
2:08:32
the fewer lines of code you have the less likely you are arguably to make any mistakes the easier it is for other
2:08:38
people to read and so generally this readability this simplification is indeed a good thing well let's go ahead
2:08:45
and add another piece of uh capability into Python and that's this one here just like in English where you can ask
2:08:51
this question or this other question you can say the same thing in Python using literally this word or so let me go back
2:08:58
to my python code here and let's propose how we might ask a couple of questions at once this time perhaps this time
2:09:05
considering how we might ask not whether or not it's greater than or equal to and caring about the precise answer let's
2:09:11
take a a coarser approach here and let's just try to determine is X greater is x
2:09:17
equal to y or not well let me go ahead delete some of this code and change the
2:09:23
question we're asking let me do this well if I care about whether it's equal or not let's check the possible
2:09:28
scenarios if x is less than y or X is greater than y let's go ahead and print
2:09:35
out X is not equal to Y now why is that no pun intended if x is less than y well
2:09:43
it's obviously not equal if x is greater than y it's obviously not equal so we can conclude X is not equal to y so if
2:09:52
we instead want to make sure that it is equal to we can just use uh hopes else
2:09:59
using print quote unquote X is equal to Y and again why is this well if x is
2:10:06
less than y or X is greater than y they're obviously not equal otherwise logically they must be equal in fact so
2:10:12
let's run this let's go ahead and run python of compare. Pi what's X One what's Y 2 okay X is not equal to Y
2:10:19
let's do it again but two for x one for Y X is not equal to Y and one third time
2:10:25
how about X is 1 and Y is One X is now equal to Y now if we want to compare
2:10:31
that visually too let me propose that the picture looks a little something like this and again this is the exact
2:10:37
same thing logically but it's a pictoral representation thereof what's the first question well if x is less than y well
2:10:44
then we follow the true arrow and we say quote unquote X is not equal to Y and then we stop but what if X is not less
2:10:52
than y what if it's greater than y what if it's 2 and one respectively then the answer to x less than y's first question
2:10:59
is false so we go here we ask the second question because of the or and that asks
2:11:05
is X greater than y if so notice this we can kind of reuse some of the same parts
2:11:10
of this picture and just say X is not equal to Y we don't need to add arrows and add boxes unnecessarily we can reuse
2:11:18
lines of code uh picture parts of the picture just as we have lines of code and then we stop lastly we have the
2:11:24
following if we know that X is not less than y we know that X is not greater than y it must be the case that x equals
2:11:31
y we don't need to ask a third question another diamond we can just immediately print as much and then say uh stop as
2:11:39
well well what could I do here I bet I could improve this code slightly and if
2:11:44
we really want to be nitpicky I would argue that this is now really just a minor refinement but it's a good habit
2:11:51
to get into thinking about could my code be better could my code be simpler could I improve this code
2:11:58
further it's subtle but could I improve the design could I ask fewer questions
2:12:04
could I tighten it up so to speak what do folks think you can ask if
2:12:11
x is just equal to Y then if you print x equal to Y else X is not equal to Y
2:12:19
perfect recall one of the other symbols we saw on the available list earlier we can check not just less than or greater
2:12:25
than or equal to we can literally ask the question is it not equal to why are we wasting time asking if it's less than
2:12:31
or if it's greater than well if all you care about is is it not equal I think we can do exactly that let's just ask the
2:12:37
one simple question we do care about and so let me go back up here and let me just say not both of these questions
2:12:44
let's get rid of the or let's just say if X is not equal to Y then go ahead and
2:12:49
print X is not equal to Y and that too I think is going to work exactly the same but the picture now looks a little bit
2:12:57
different notice that this was our flowchart earlier that represented that same logic and there's a bit of
2:13:02
complexity you got to go left you got to go right based on the answer to these couple of questions if we now take into
2:13:07
account what this version of the program looks like it's even simpler perhaps the simplest one we've seen yet when we
2:13:12
start off the program we ask just one and only one question is X not equal to Y and if so true we go ahead and print
2:13:20
out X X not equal to Y if the answer is false then of course it must be equal to
2:13:25
Y so we say that instead and if we really want we could invert this if I go back here to my code and if for whatever
2:13:32
reason you just prefer to think in terms of equal or not equal as opposed to not
2:13:37
equal or equal it's really uh up to you we could change this to be equals equals
2:13:43
but I'm going to have to change my print statements to be in the opposite order so let me go ahead now and reverse these
2:13:49
two here and move the second one first and the first one second so now when I execute this code
2:13:56
I'm asking still just one question so it's still just as good just as succinct but now the diagram instead of looking
2:14:02
like this is going to change the not equal to equal equal and we just need to make sure that we print out the right
2:14:08
thing accordingly and again here too just as the code is getting a little more compact a little more compact with
2:14:14
fewer and fewer characters so are these diagrams these flowcharts capturing the relative simplification of each of those
2:14:22
programs too all right let me go ahead and pause here to see if there's any questions now on any of these versions
2:14:28
of code yeah I have a couple of questions
2:14:34
uh what if indentation is not used uh if indentation is not used your
2:14:39
program will not work so python is a little different from a lot of languages in that it enforces the indentation
2:14:46
requirement uh some of you who have been programming for years might not necessarily be in the best habit of
2:14:51
indenting your code properly and one of the features arguably of python is that it makes you indent your code or it will
2:14:58
not just work and I think did you have one other question uh yeah uh is the
2:15:04
colon necessary is the colon necessary yes the colon 2 is necessary so with python what
2:15:11
you see is what you get here and indeed it needs to be indented and the colon is necessary python does not use in the
2:15:18
same way by Convention as C and C++ and Java curly braces to canote blocks instead it relies indeed on this
2:15:25
indentation well let me propose that we introduce one other keyword here in Python to see exactly how we might
2:15:31
combine additional thoughts and that's going to be literally the word and a conjunction of one or two or more
2:15:37
questions that we might want to ask at once and let me propose here that we explore this kind of logic by way of
2:15:44
another program Al together in VSS code whereby I'll go ahead now and create a new program say called grade. Pi let's
2:15:51
consider exactly what grade a student should get based on their score on an exam or a test or a quiz or some other
2:15:57
assignment like that I'm going to go ahead and run code of grade. py to give myself a new file and I'm going to go
2:16:03
ahead and start by just getting the user score again on some assignment or test or the like and I'm going to store it in
2:16:08
a variable called score equal the return value of the int function which is going to convert whatever the user's input is
2:16:14
when prompted for this score so again the user should just Oblige by giving me a number like zero or one or two or or
2:16:21
hopefully much higher than that like 997 98 99 100 assuming the test or assessment is out of 100 percentage
2:16:28
points now how could I go about assigning a grade to the student score well in the US it's very commonly the
2:16:35
case that if you get between a 90 and 100 that's an A and if it's between an 80 and a 89 it's a b if it's 70 and 79
2:16:44
it's a c and so forth all the way down to F which should be e but we'll see that there's a bit of a jump so how
2:16:50
might I exess this well I can use conditionals and I can ask a few questions and then print out the student's grade accordingly so let me
2:16:56
express it like this if the student score is greater than or equal to 90 and
2:17:02
the student score is less than or equal to 100 so it's in that range let's go ahead and print out that their grade
2:17:08
shall be in a because they're in the 90s above grades range L if the score is
2:17:16
greater than or equal to 80 and the score is less than or equal to say 89 but here I have some options
2:17:23
logically I can actually express myself in any number of ways and maybe just to be a little cleaner I'm going to say in score is less than 90 so I'm using less
2:17:31
than instead of less than or equal to so I'm making sure that their boundaries between these grades are correct then
2:17:37
I'm going to go ahead and give the student a b if it's in the 80s L if
2:17:43
score is greater than or equal to 70 and the score is less than 80 I'm going to go ahead and give them a c l if the
2:17:51
score is greater than or equal to 60 and the score is less than 70 I'm going to go ahead and give them a d and here's
2:17:58
where it's a little anomalous at least in some schools here else I'm going to go ahead and give them uh an F so we're
2:18:05
skipping e Al together and we're going to give an f instead for the grade so that's the catchall and I think
2:18:11
logically I've gotten this correct at least based on where I went to school growing up such that it's going to give
2:18:17
an A or a b or a c or a d else it's going to ass assume that you got an F well let's try just a few of these here
2:18:23
let's run python of grade. Pi my score is let's let's start strong 100 all
2:18:29
right I got an A didn't do as well the next time maybe it's a 95 still an a starting to slip further so I got an 89
2:18:36
the next time that's now say a b and let's say I really had a bad week and it's now like a 71 that's now A C or I
2:18:44
didn't even submited at all that's a an F Al together all right so it seems to work that's not really an exhaustive
2:18:50
test but at least based on some sampling there my code seems to work as I expect but let's see if we can't tighten this
2:18:55
up it's not wrong it's correct and indeed according to my own specifications I dare say this code is correct but can we tighten it up can we
2:19:03
reduce the probability of bugs now or down the line can we increase the readability of it and can we increase
2:19:08
the efficiency of it can we get the computer to have to answer fewer questions and still get the same result
2:19:15
well let's see what we might do let me just kind of switch things up if only to demonstrate that we can use these symbols in different ways is I could say
2:19:22
as I've done if score is greater than or equal to 90 but I can actually do this I can flip it around instead of saying
2:19:28
greater than or equal to let's say 90 is less than or equal to score and here
2:19:35
let's say if 80 is less than or equal to score and here
2:19:41
70 is less than or equal to score and then lastly 60 is less than or equal to
2:19:46
score so it's the same thing logically I'm just kind of switching things around just like you could do on paper pencil
2:19:52
if you really wanted but now notice this trick and this is not possible for those of you who have programmed in C or C++
2:19:58
or Java or other languages notice what I can do here is actually combine these
2:20:03
ranges notice that I'm asking two questions two Boolean Expressions is 90 less than or equal to score and is score
2:20:11
less than or equal to 100 well python allows you to Nest these things like
2:20:16
this and chain them together and just like you would on paper pencil the real world you can encode in Python do this
2:20:24
which is just a little cleaner right it's tightening up the code a little bit it's fewer keystrokes it's faster to type it's easier to read moving forward
2:20:31
so that's arguably better as well so that's one Improvement it's largely aesthetic in this case it's still asking
2:20:37
the same number of questions but it's doing it a little more succinctly still well what what more could I do here next
2:20:45
well you know what each time I'm deciding these grades I don't think I have to ask two questions I I don't have
2:20:51
to ask is it greater than 90 and less than 100 is it greater than 80 and less than 90 if I kind of rethink my logic I
2:20:58
can maybe do this better still let me propose that we simplify this further and just do this if we know the input
2:21:05
for the moment is going to be within zero and 100 we can make some assumptions we could say something like
2:21:11
if the score is greater than or equal to 90 well the student gets an A L if the
2:21:17
score is greater than or equal to 80 the student gets a b l if score is greater than or equal to 70 they get a c l if
2:21:26
the score is greater than or equal to 60 they get a d else they get an F so what
2:21:34
have I done here well instead of asking two questions every time checking the
2:21:39
lower bound and the upper bound of that range I'm kind of being a little more clever here by asking if the score is
2:21:45
greater than 90 well they've obviously gotten an A or better if your score is greater than A8
2:21:51
well you either deserve an a if it's really strong or a B if it's just above 80 but because of the if L if logic
2:21:59
we've already checked is the student score greater than 90 and if it's not then we're asking the question well is
2:22:04
it greater than 80 so you implicitly know it's somewhere in the 80 to 89 range else you know it's in the 70 to 79
2:22:12
range else it's in the next range down so it's a minor optimization that allows us to ask fewer questions but again it's
2:22:19
making the code arguably a a little more readable certainly more succinct and then hopefully more maintainable longer
2:22:25
term any questions then on these types of changes and this type of logic
2:22:32
with our code uh what if we don't use l if at all what if we uh write the code in F yeah
2:22:41
so that's a good question because it's actually going to have an unintended effect here let me get rid of the F
2:22:48
temporarily and just focus on a through d if we revert to where we began today's
2:22:53
story with conditionals saying if if if if now our cleverness here of using
2:22:59
broader strokes and not using in upper and lower bound ranges is going to come back to be a downside let me go ahead
2:23:07
and run python of grade. Pi and suppose my score is uh 95 I am so darn excited I
2:23:13
want my a but nope I just got an A a b a c and a d so logic that's broken things
2:23:21
because if you don't make these conditions mutually exclusive every one of those questions is going to get asked
2:23:27
and therefore answered and even if your grade is above a 90 it's also logically
2:23:33
above an 80 above a 70 above a 60 and if i' kept it in there I would have failed as well with an F really good question
2:23:40
other questions here on this form of logic like it would there be any I guess better way to kind of clean up even just
2:23:47
this simple statement like we had before the previous one that you had with the El oh I I I like your enthusiasm for
2:23:53
simplifying things further I'm going to go out on a limb here and say this is
2:23:58
about as good as it gets at least using only conditional statements I can if my
2:24:04
mind wanders think of a slightly more clever way to do this maybe with something called a loop or another
2:24:10
programming construct we don't have that yet in our vocabulary but yes there's absolutely other ways to do it but I think not yet if we want to restrict
2:24:17
ourselves to just words like if and or and else uh and L if and and and the
2:24:22
like well let me propose that we pivot now to use another approach here that uses one other symbol that up until now
2:24:28
we've not really had occasion to use let me propose that we Implement a program uh that we'll call parity in mathematics
2:24:35
parity can refer to whether a number is even or odd and that's kind of an interesting question and turns out it
2:24:40
can be useful in other applications too to I just ask the question is a given number even or odd maybe that the user
2:24:46
typed in and let me go ahead and write a new program called parity Pi via code
2:24:52
parody. Pi in my terminal and let me propose that we use this as an opportunity to introduce the last of
2:24:59
those arithmetic symbols at least most of which we're familiar with addition subtraction multiplication division but
2:25:05
there's been on this list before this last one here a percent sign and it doesn't mean percentage in this case
2:25:10
when used as an operator in programming in Python rather it represents the so-called modulo operator for modular
2:25:17
arithmetic or at least in our case we're going to use it to calculate the remainder when dividing one number by
2:25:23
another well what do I mean by that well if you take a number like 1 divid 3 3
2:25:28
does not go into one eat cleanly so you have a remainder of one two divided
2:25:33
three has a remainder of two three divided by 3 has a remainder of zero
2:25:38
because it divides cleanly four divided 3 has a remainder of one because you can
2:25:44
divide it in once but then that leaves one so it has a remainder of one and then lastly something like five divided
2:25:50
by three has a remainder of course of two so that's all we mean by remainder how much is left over after dividing one
2:25:56
number by another well if I go back now to my code and I consider how I might
2:26:01
implement the question is this number even or odd let's consider how we might Implement that since it's perhaps not
2:26:08
necessarily obvious how we can use this additional building block but it turns out it's going to be very useful longer
2:26:13
term well let's first just get a number from the user in a variable called X and I'm going to set that equal to the
2:26:18
conversion to int of whatever the user inputs after asking them what's X question mark and we've done that before
2:26:25
many times how do I now determine if x is even or odd well it turns out if I
2:26:31
have access to a programmatic operator that tells me the remainder I think I
2:26:37
can do this in fact let me just ask the group and this is just from grade school math perhaps what does it mean for a number to be even to be clear a number
2:26:46
like 0 2 4 6 8 10 12 12 14 16 those are
2:26:52
all even numbers but what does that really mean Elena if I'm saying that right uh even numbers that can divide it
2:26:58
exactly by two for example 2 4 6 8 and 10 and perfect and we could go on all
2:27:05
day long literally since there's an infinite number of those even numbers but it's nice that you formulated it in
2:27:10
terms of a question that we can ask very clearly is this number cleanly divided
2:27:16
by two that is can we divide it by two with no remainder a remainder of zero
2:27:21
well that's perfect because if we have this operator this percent sign that allows us to answer just that what is
2:27:27
the remainder we can presumably check is the remainder is zero or is it one do we have nothing left over or do we have one
2:27:33
left over well let's ask that if x ided by 2 has a remainder of zero as Elena
2:27:42
proposes let's go ahead and print out something like quote unquote even and just say as much to the user else I
2:27:48
think we can assume that if a number is not even it's going to be odd if it's indeed an integer so I'm going to go
2:27:54
ahead and print out quote unquote odd instead and let's go ahead and now run python of parody. piy in my prompt
2:28:00
what's X let's start with two two is in fact even let's start with four four is in fact even let's get thing let's get
2:28:07
interesting with three three is now odd and I think we could do that all day long and hopefully get back indeed
2:28:13
exactly that answer but what more could we do here how could we improve upon
2:28:19
this well recall that we have the ability to invent our own functions and let me just propose for the sake of
2:28:25
discussion that we're going to eventually find that it's useful to be able to determine if a number is even or odd and so we'd like to have that
2:28:31
functionality built in and I don't think python has a function for telling me just that but I can invent it using Code
2:28:37
like just this so let me go into my earlier version here and let me propose
2:28:43
that we do this let me go ahead and write a main function I'm going to get
2:28:48
back into that habit of defining a main function to represent the main part of my program and I'm going to do what I
2:28:54
did before I'm going to get an integer from the user's input asking them what's X question mark and then I'm going to
2:29:01
ask this question for the moment I'm going to naively assume that the function already exists but that's a
2:29:06
useful problem solving technique even if I have no idea yet where I'm going with this how I'm going to invent a function
2:29:12
that determines if a number is even I'm just going to assume that there's a function called is even and I'm going to
2:29:18
call it blindly like this if is even passing in X then go ahead and print
2:29:25
quote unquote even so if this magical function called is even returns true as
2:29:32
its return value I'm going to print out that it's even else otherwise I'm going
2:29:37
to assume that it's of course odd now the one problem with this program even if I call Main over here is that is even
2:29:44
does not exist and this program would break if I ran it right now but that's okay I have the ability call to invent
2:29:50
my own function so let me Define with def a function called is even I want
2:29:56
this function to take an argument and I'm going to call it n just a number generically I could call it X but again
2:30:02
I don't want to confuse myself as to which X is which so I'm going to give it a different name and that's fine I'm
2:30:07
just going to call it more generically n for number and then I'm going to do this I'm going to say if n percent 2 equals
2:30:16
equals z just like before then and here's the magic you the programmer can
2:30:22
actually return what are called Boolean values we've seen in Python that python
2:30:28
has stirs or strings ins or integers Floats or floating Point values all of
2:30:34
which are different types of data in python python also has a fourth data type called bull for a Boolean value and
2:30:41
even though this is just adding to our list the nice thing about bulls is that they can only be true or false an INT
2:30:49
can be any number of infinite possible values a bull can only be true or false
2:30:54
and it must be capital T and capital F if you're writing itself so if I go back
2:30:59
now to my code and I consider exactly what I want to return here well if x if
2:31:06
n% 2 equals equal Z that is if n / two has a remainder of zero well I think
2:31:13
it's even to Elena your definition so let's return true capital T else if it
2:31:19
doesn't have a remainder of zero I'm pretty sure mathematically it's got to have a remainder of one but it doesn't
2:31:24
matter I know it's not even so I'm going to return false and we returned false
2:31:30
instead capital F and now that we've defined both Main and is even and I'm
2:31:36
calling main at the bottom I think I've got this right python of parody. Pi enter what's X let's try something
2:31:43
simple like two and it's even let's do it again what's X how about four even
2:31:48
once more what's X X how about three and it's odd now what have I done here I've
2:31:54
just made the point that if I want to create my own function called is even that answers this question for me that I
2:32:00
can now use in this program and heck maybe future programs that I write I now have a function that no one gave me I
2:32:07
gave myself that I can use and reuse and I can even perhaps share it with others I'm using that function now on line
2:32:13
three just to make a decision I'm using a conditional up there and my Boolean expression something that's true or
2:32:20
false is going to be not something explicit like X less than y or y greater
2:32:25
than x or the like it's going to be a function call I'm using a function as my Boolean expression but that's okay
2:32:32
because I know because I wrote it that that function is even returns true or it
2:32:38
returns false and that's all I need in a conditional to make a decision to print even or print odd so let me pause here
2:32:46
to see if there's any questions now on how I've implemented is even using this bull hello hi David
2:32:54
first of all thank you for this wonderful class uh did before yesterday and today uh I have just one query like
2:33:00
bases on my background of java uh there when we used to pass the arguments we
2:33:06
can also pass the address of the variables so is there any sort of this concept in Python uh short answer no
2:33:14
those who are unfamiliar with Java or other languages or C or C++ there's generally ways to pass values in
2:33:20
different mechanisms that allow you or disallow you to change them in Python no everything we're going to see is
2:33:25
actually in fact an object but more on that down the line how about time for one more question here on these bulls
2:33:33
and these is evens so I actually had a question about um defining a function
2:33:39
okay if that's okay sure so if you define one are you like within your code like you made it up are you allowed to
2:33:45
use the dot operator like we did name. strip and use it like that
2:33:50
good question if you've created your own function can you use other functions like strip ortitle or Capital eyes that
2:33:58
we've seen in the past um you can use those on strings those functions come
2:34:03
with strings you can't necessarily use them on your own functions unless your
2:34:08
function returns a string for the examples you gave I'm returning a bull bulls have no notion of white space to
2:34:15
the left or the right you can't call strip you can't call capitalize but if you were writing a different function that that returns a string absolutely
2:34:21
you could use those functions as well well let me turn our attention if I may back to this example here and consider
2:34:27
as we now frequently do can we improve on the design of this code can I make
2:34:32
this particular program better and I can there's a couple of ways here and I'll show you something that's now generally
2:34:38
known as something pythonic there's actually this term of Art in the python world where something is pythonic if
2:34:44
it's just the way you do things in Python which is to say we've seen already there's so many different ways
2:34:49
to solve certain problems and in the python community of programmers there tend to be some ways that are smiled
2:34:56
upon more than others and they tend to relate to features that maybe only python has but not other languages and
2:35:02
here's some syntax that you might not have seen in languages like Java or C or C++ if you've programmed before and if
2:35:08
you've never programmed before this too is going to be new instead of asking a question like this if else using four
2:35:16
lines in Python you can actually collapse this into just just one more elegant line if you will instead of
2:35:23
asking if n / 2 has a remainder of zero return true else return false let me
2:35:31
delete all of that and just say this return true if n / two has a remainder
2:35:39
of zero else return false now those of you who do have prior programming
2:35:45
experience might actually think this is kind of cool you can condense from four lines into one on line that very same
2:35:51
thought and one of the reasons why python is popular is that it does tend to read rather like English it's not
2:35:57
quite as user friendly as most English or most human languages but notice now the line does rather say what you mean
2:36:04
return true if n / two has a remainder of zero else false I mean that's pretty
2:36:11
darn close to something you might say logically in English be it about even an odd or really anything else so that
2:36:18
program is going to work exactly the same python of parity. Pi let me type in two it's still even let me type in three
2:36:24
it's still odd but I can refine this even further and again consistent with this idea of not just writing correct
2:36:30
code but writing better and better code but still keeping it readable I can do
2:36:36
one even better than this notice this value here is my Boolean expression and
2:36:41
it is going to evaluate to true or false is n / two having a remainder of zero or
2:36:48
not like that is by definition a Boolean expression it has a yes no answer a true
2:36:54
false answer well if your Boolean expression itself has a true or false
2:37:00
answer why are you asking a question in the first place why ask if why say else
2:37:07
just return the value of your own Boolean expression and perhaps the
2:37:14
tightest version the most succinct and still readable version of this code would be to delete this whole line
2:37:20
pythonic though it is and just return n modulo 2 equals equals 0 if it helps let
2:37:29
me add parentheses temporarily because what's going to happen in parentheses will happen first n / by two either does
2:37:36
or does not have a remainder of zero if it does the answer is true if it doesn't
2:37:42
the answer is false so just return the question if you will you don't need to wrap it explicitly with an if and an
2:37:50
else and in fact because of order of operations you don't even need the parentheses so now this is perhaps the
2:37:57
most elegant way to implement this same idea now which is better this is pretty
2:38:02
darn good and it's hard to take fault with this because it's so very succinct but it's perfectly okay and just as
2:38:09
correct to have an if and then an else even though it might be four Total Lines if that helps you think about your code
2:38:16
more clearly and it helps other people reason about it as well so it turns out there's another syntax that you can use
2:38:22
to implement the same idea of a conditional whereby you do something optionally based on the answer to some
2:38:28
Boolean expression and the keyword that you can now use in recent versions of python is called this match match is a
2:38:34
mechanism that if you've programmed before is similar in spirit to something called switch in other languages for
2:38:40
instance let me go ahead here and close out parody. py and let me go ahead and create a new file called house. py and
2:38:47
in house dopy I think what we're going to do is try to implement a program that prompts the user for their name and then
2:38:53
just outputs what house they're known to be in in the World of Harry Potter so for instance let me go ahead and do this
2:38:58
let me give myself a variable called name set it equal to the return value of the input function and I'll say
2:39:03
something like what's your name question mark and then after that I'm just going to use a traditional if L if else
2:39:11
construct to decide what house this person is in so let me say if name equals equals say Harry as in Harry
2:39:18
Potter well let's go ahead and print out Harry's house which is Gryffindor in the World of Harry Potter L if the name is
2:39:25
instead Hermione then go ahead and print out also quote unquote Gryffindor as
2:39:31
she's in the same house too L if name equals equals Ron let's go ahead and similarly print out Gryffindor quote
2:39:38
unquote and let's make this a little more interesting now L if name equals quote unquote how about Draco Draco
2:39:45
Malfoy in the books Let's go ahead and print out quote unquote Slytherin and just in case someone else's name gets
2:39:51
inputed for now let's just suppose that we don't recognize them and say by default else print out quote unquote who
2:39:58
question mark just to convey that we don't actually have a hard-coded response to that particular name let me
2:40:04
go ahead now and run this as python of house. py enter and I'll go ahead and
2:40:09
type in something like Harry and voila we see that Harry is indeed in Gryffindor let's run it one more time
2:40:14
python of Housey let's type in Draco this time Slytherin and now let's type in an unrecognized name let's go ahead
2:40:21
and rerun python of house. py and let's go ahead and type in Padma enter and who
2:40:26
because we haven't actually hardcoded with an L if condition in this case uh what house Padma is meant to be in all
2:40:32
right well it turns out there's other ways to implement this indeed there's some redundancy here in that we're
2:40:37
checking if Harry or Hermione or Ron are all in Gryffindor I feel like we can at least tighten this code up a little bit
2:40:44
using techniques we've seen already so let me go ahead and do this let me go up here and instead do something like this
2:40:49
let's get rid of these two blocks of L ifs leaving just Harry's for a moment and let's use that or keyword again and
2:40:56
say or name equals equals quote unquote Hermione or name equals quote unquote
2:41:02
Ron thereby consolidating all three cases if you will into just one if
2:41:07
statement then we still have a separate L if for Draco because he's not in fact in Gryffindor and then the final El to
2:41:13
catch anyone else all right let me go ahead now and run this version of the program python of house.i I'll type in
2:41:19
hermion this time she too is still in Gryffindor let me try it with Ron and that too still seems to be correct well
2:41:26
it turns out there's another approach alog together that can perhaps make your code a little less verbose you could
2:41:31
imagine how complicated this code might get if we had not just Harry and Hermione and Ron but a whole bunch of
2:41:37
other names as well for Gryffindor for Slytherin and for all of the other Hogwart toes so you can imagine that
2:41:43
code is getting pretty unwieldy pretty fast well it turns out another technique you can use is indeed this keyword
2:41:48
called match which is very similar in spirit but the syntax is different and allows you to express the same ideas a
2:41:53
little more compactly so let me go back to house dopy and let me propose that I get rid of my current if L if else
2:42:00
approach and instead do this literally use the keyword match and type the name of the variable or value that we want to
2:42:07
match on and then I'm going to go ahead and include a colon and then underneath that I'm going to include literally a
2:42:14
keyword called case and the first case I want to consider is going to be Harry and I'm going to put Harry in quotes
2:42:19
because it's a string or a stir and I'm going to have another colon at the end of this line and indented under that one
2:42:25
I'm going to go ahead and for now print out Gryffindor which of course is Harry's house otherwise I'm going to
2:42:30
have another case for quote unquote Hermione and similarly I'm going to have under that indented print quote unquote
2:42:37
Gryffindor close quote now I'm going to have another case for Ron also in quotes with a colon now print quote unquote
2:42:44
Gryffindor and now I'm going to have a other case for let's say Draco this one gets a little more interesting because
2:42:50
Draco of course now is in Slytherin and then I'm going to go ahead and leave it as that for now so let me go ahead and
2:42:57
save this file and go back down to my terminal window running python of house. py enter and let's go ahead and try
2:43:03
Harry and he seems still to be in Gryffindor let's run it again for Hermione enter Gryffindor let's skip
2:43:09
ahead to Draco and type in draco's name he's indeed in Slytherin now let's try another name that we haven't uh handled
2:43:16
a case for like Padma again enter and we're just ignored there's no output whatsoever because there wasn't a case
2:43:22
for Padma now we could of course go back in and explicitly add one for Padma but what if we similarly to the else
2:43:29
construct just want kind of a catchall that handles anyone whose name is not explicitly specified Well turns out the
2:43:35
Syntax for that using this new match statement is to still have another case but then to use this single underscore
2:43:42
character which is used in other context in Python but for here it's meant to say whatever case has not yet been handled
2:43:48
go ahead and print out as we did before for instance quote unquote who with a question mark at the end now let's go
2:43:55
ahead and rerun this python of house.i I'll type padma's name again and this time I think we're at least going to get
2:44:01
an explicit response indicating who whereas previously we did not have the equivalent of that now I think we've
2:44:07
regressed a little bit we went from tightening things up by putting Harry and Hermione and Ron all in the same
2:44:13
line and the same if statement but here we have now three case statements again for all three of those well we can
2:44:19
tighten these this code up as well but the syntax is going to be a little bit different I'm going to go ahead and
2:44:24
delete these two middle cases for hermion and Ron and then up here next to Harry's name before the colon I'm going
2:44:31
to go ahead and use a single vertical bar and then a quote unquote hermy then another single bar and do quote unquote
2:44:38
Ron and this is how using this relatively new match statement you can say the equivalent of Harry or Hermione
2:44:45
or Ron but more concisely than you could using an if statement alone as we
2:44:50
implemented it previously so now one final run of the program with python of house.i let's make sure that Harry is
2:44:57
still in Gryffindor let's make sure that hermion is still in Gryffindor let's make sure that Ron is still in
2:45:02
Gryffindor and indeed all three of them are now as always with python and programming more generally there's going
2:45:07
to be different ways you can solve these problems this is just another tool in your toolkit arguably it has tighten
2:45:13
things up arguably it's perhaps a little more readable because there's a little less syntax going on a little less
2:45:19
duplication of equal signs and ell if and ell if and ell if all over the place but ultimately this would be an equally
2:45:24
correct approach to that same problem but it turns out with the match statement you can do even more powerful
2:45:30
forms of matching as well here we've used it simply to implement the same idea as that if L if else construct and
2:45:37
it's worth noting if you've programmed in some other language the syntax here is indeed correct you do not need for
2:45:42
instance a break statement as has been peppered throughout and you don't need something like default or something
2:45:48
explicit you indeed just use this underscore as your catchall at the end of the match so just by adding in some
2:45:55
of these new keywords here like if and L if and else we have now the ability to
2:46:01
ask questions about values we have the ability to analyze input from users and ultimately make decisions about it and
2:46:08
these then were our conditionals lying ahead is going to be the ability for us to not only use functions and variables
2:46:14
and also these conditionals but also next Loops the ability to do something now
2:46:19
again and