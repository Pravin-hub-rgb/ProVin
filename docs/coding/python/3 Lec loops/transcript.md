
2:46:38
[Music]
2:46:46
again all right this is cs50's Introduction to programming with python
2:46:51
my name is David men and this week we focus on Loops this ability in python and a lot of other programming languages
2:46:57
to do something again and again a cycle of sorts and let's see if we can't begin
2:47:02
by motivating exactly why we have this ability to do things cyclically using these Loops I'm going to go ahead here
2:47:09
and open up VSS code and in my terminal window let's go ahead and create uh via
2:47:15
code cat. py a Python program that meows like a cat and I'm going to go ahead
2:47:21
here in this code tab very simply perhaps I'm going to start by implementing this cat just by using
2:47:26
prints we're going to have this cat not make audible sounds but just print meow meow meow on the screen three times well
2:47:32
I think the simplest way I can do this is just to print meow once and to print meow again and to print meow One Last
2:47:40
Time on the screen and now let me go down to my terminal window let me run python of cat. py enter and meow meow
2:47:48
meow all right so this program works this program indeed works if my goal is to get the cat to meow three times and
2:47:54
let me propose just to help us wrap our minds around what's going on inside of the computer let me propose that we
2:48:00
consider this flowchart so as before we have this flowchart that starts with a of this oval which just means start
2:48:06
reading here and then notice it goes via arrows to a meow meow meow and then it
2:48:12
stops it's perfectly correct and honestly it's wonderfully simple but I
2:48:17
dare say we can find fault with my code nonetheless why is my code arguably
2:48:24
poorly designed now the answer is going to be Loops in some way but let's see if we can identify in what way the code is
2:48:32
actually poorly designed in some sense let's see any thoughts
2:48:38
Alex okay so I mean repeating the same action like three times or even more um
2:48:44
it's not a good habit yeah I'm just repeating myself and honestly it's not that big a deal if we go back to my code
2:48:51
here am I really uh doing such a bad thing by just printing meow meow meow three times not really but let's
2:48:58
consider The Logical extension of this suppose I want to meow four times or five times or 50 times or 500 times do
2:49:06
you really think even if you've never programmed before is the solution to this problem really going to be to hit copy paste 50 times like probably not we
2:49:14
can probably do better than that and Beyond it just being ugly at that point having so many lines of identical code
2:49:20
just imagine if you wanted to change the code maybe I changed my mind and I don't want to make a cat I want to make a dog so now it has to say woof woof woof
2:49:27
multiple times now I have to change that in like 50 different places and yeah sure I could do find and replace but
2:49:33
come on like we're programmers now there's got to be a better way than just repeating ourselves so I bet we can do
2:49:39
better than that if we think about a little harder what we how we go about
2:49:44
structuring this program and we can do that if we augment our vocabulary just a little bit it turns out in Python and in
2:49:51
other languages too there's a keyword called while and while is one way that
2:49:56
we can express what's called a loop a block of code that's going to do something again and again and again zero
2:50:02
times one time two times 50 times as many times as we want but while rather
2:50:08
leaves to us the the particulars of how we express ourselves to do something
2:50:14
again and again so let me go back over to vs code here and let me propose that I do this while is a construct that
2:50:21
allows me to ask a question again and again and anytime we've seen a question it's been in the form of a Boolean
2:50:27
expression a question to which the answer is true or false well how could I do this how could I print out meow three
2:50:35
times and ask three times a question to which the answer is true or false well
2:50:41
what if I did some counting right like literally on my fingers and if I'm trying to count maybe down from three I
2:50:47
want to meow three times I can put three fingers up and I can meow and then I can put like one of the fingers down and
2:50:53
then meow and I can put one of the fingers down and I can meow put one of the fingers down and maybe the question
2:50:59
I can ask every time I meow is do I have any fingers up still do I have any
2:51:04
fingers up still do I have any fingers up still and if the answer is true keep going if the answer is false stop so how
2:51:12
can I translate that to code well once we've added this while keyword I think we have all the building blocks already
2:51:18
let me propose that I do this let me propose that I give myself a variable and I'll call it I for integer but I
2:51:24
could call it anything I want and I'm going to initialize it to three then I'm going to use this new feature of python
2:51:30
while and I'm going to ask a question the answer to which must be true or false and I'm going to say while I does
2:51:38
not equal zero so I'm going to ask the question while I does not equal zero do
2:51:45
the following notice the colon at the end of the line notice my indentation and just like with functions just like
2:51:50
with conditionals you indent the lines that you only want to execute as part of
2:51:56
this other thing what do I want to do while I does not equal zero well I think
2:52:02
I just want to meow but it's not enough just to write this code if I were to
2:52:09
very dangerously run python of cat dopy and hit enter right
2:52:15
now what might happen on the screen whether you've programmed before or not
2:52:21
why is this a very bad thing potentially it's not going to break things but it might it might lose control of my
2:52:28
computer somehow any thoughts uh yeah teimo hi uh
2:52:34
I think it's going to continue uh to print out Mel since I is always equal to
2:52:41
three and the W is always true yeah exactly if I'm initializing I to three
2:52:47
that is setting it equal to three on line one then I'm asking the question while I does not equal zero and that's
2:52:53
going to be true it does not equal zero it obviously equals three print meow and the way a while loop works is that the
2:53:00
python interpreter just keeps going back and forth it goes from line one to line
2:53:06
two then to line three and then it goes back to line two to ask the question
2:53:11
again if the answer still true it goes to line three it then goes back to line two if the answer is still true it goes
2:53:17
back to line three and to U's point if you're never actually changing the value
2:53:22
of I it's always three you're just going to be looping literally forever and this
2:53:27
is an accidental infinite Loop so we've got to be smarter than that and I'm not going to hit enter because I don't want
2:53:33
to lose control over my computer here such that it's printing out meow forever um fortunately if you ever do do that
2:53:39
and you find yourself in an accidental infinite Loop control C for cancel or
2:53:44
interrupt is going to be your friend if you ever seem to lose control you don't need to like reboot or turn off the
2:53:50
computer you can just hit contr C in your terminal window and that will likely fix it all right well what do I
2:53:56
want to do then after meowing each time I think what I'd like to do here is maybe something like this let me update
2:54:04
I to equal whatever the current value is uh uh minus one here whoops sorry minus
2:54:11
one so if I on each iteration am updating I to be one less one less one
2:54:17
less it should eventually hit zero at which point the answer to 9 2's question
2:54:23
will now be false so let's see if this works I'm going to go down to my terminal window and run python of caty
2:54:30
and I indeed get three meows why because I've kind of wired this up kind of like
2:54:35
a machine in software if you will I've set I equal to three then I keep asking this question but I keep turning the
2:54:42
gears I keep changing the value of the variable to make sure that ultimately it is actually being decremented that is
2:54:50
decreased by one until we eventually hit zero now for those of you who think a little more graphically let me pull up
2:54:56
one of our usual flowcharts this is just a representation graphically of the exact same thing notice what's happening
2:55:02
I first start the program and then I initialize I to three and then I ask the
2:55:08
first of my questions again the diamonds always represent questions and the answer is going to be true or false does
2:55:13
I not equal zero well it doesn't it equals three so if I follow the true line I meow and then I follow this arrow
2:55:21
and I update I to equal IUS one at this point in the story I presumably equals
2:55:27
two mathematically I Follow the arrow and there's the loop this is why it's nice to see this graphically perhaps
2:55:32
because you can literally see the loop back and forth now I ask the question again does two not equal zero well it
2:55:40
does not equal zero it's two so we meow again we change I from 2 to 1 well does
2:55:45
one not equal zero well obviously it is not zero so we meow again we decrement I
2:55:52
again I is now zero does 0 not equal zero no it equals zero so the answer is
2:55:59
false and we stop so there perhaps more so than any of our flowcharts before do
2:56:04
you really see the structure of what's Happening inside of the program and you don't have to get into the habit of
2:56:10
making these charts or creating these charts but just as a first pass at what's going on inside of the computer
2:56:15
that's indeed one way to visualize it instead well let me propose that like always there's many different ways to
2:56:21
solve this problem and suppose you just like to think a little differently maybe you don't like starting at three and
2:56:26
then counting down to zero y maybe your just brain doesn't work that way and you prefer to count up instead of down
2:56:32
totally fine let me go ahead and change my code here to set I equal to 1 instead
2:56:38
of three and here let me just change my logic rather than checking for not equal to zero like maybe you don't like
2:56:44
thinking terms of not because it's a little confusing and it might be let's just check that I is less than or equal
2:56:51
to three so we'll be a little more explicit we'll count from one up through three each time printing meow but I'm
2:56:58
going to need to change this line here let me see if we can't call on someone to change line four for me how do I want
2:57:04
to change line four to be consistent with counting from one up to
2:57:11
and through three I would be plus one every time you
2:57:20
meow yeah exactly in this case we want to add one not subtract one and in fact
2:57:25
if you think about this this two could end very poorly right if you start counting at one and you keep subtracting
2:57:31
one subtracting one subtracting one I think we're going to find oursel with the same problem which is that we're
2:57:36
never going to stop because we're going to keep getting more and more negative as opposed to ever getting up to the
2:57:42
number three so I think you're right I need to change this to be IAL I + 1 and
2:57:48
now notice just for Clarity 2 the equal sign is again our assignment operator from right to left logically this might
2:57:55
otherwise strike you as strange like how can I equal itself plus one well it doesn't until you execute this code from
2:58:02
right to left you add one to I or You Subtract one from I and then you update the value of I on the left the
2:58:08
assignment copies the value from the right to the left well how else might I do this well I will say that most
2:58:15
programmers computer scientists more generally tend to start counting from zero it's a convention and it actually
2:58:21
has upsides even in Python and other languages where generally speaking it's a good thing to start counting from zero
2:58:27
instead of counting like we might in the real world from one let's go ahead and adopt that convention now let me set I
2:58:34
equal to zero and I need to make a change now notice if I don't change my
2:58:39
logic this program just became buggy the cat has a bug it's now meowing four
2:58:45
times if I run it as is but the easiest fix here would be to change my inequality to be this less than instead
2:58:53
of less than or equal to now I'm starting at zero but I'm going up two but not through three and even though
2:59:00
this might of all the things we've seen thus far seem maybe the least familiar most of us might start at one two then
2:59:07
three it's a good habit to get into now start at zero and go up two but not
2:59:12
through the value that you care about ultimately three in this case here well let me tighten things up a bit here not
2:59:18
only will this now fix my counting problem it now meows three times as expected there's a more succinct way to
2:59:24
express I equals I + 1 and this is because it's such a popular thing to do in code you can instead just say i+
2:59:32
equals 1 and that's it you don't need to put everything on the right hand side this is a special syntax that says the
2:59:40
exact same thing increment I but it does it with a few fewer keystrokes it's just
2:59:45
a little more pleasant to type it's a little faster to read it's it's just a convention those of you who have programmed in C C++ pyth uh not python C
2:59:54
C++ Java Java Script might have seen plus plus before or minus minus sorry
3:00:01
python doesn't have it so you cannot use that this is a succinct as your line of code might
3:00:06
get all right let me pause here to see then if there's any questions about
3:00:12
these implementations of while Loops um can we use stuff like four
3:00:18
Loops which um have a certain I value
3:00:23
initialized to it at at the start and it runs from the particular condition you
3:00:29
put into the um into the thing and increment it as as you go along short
3:00:35
answer no you cannot do what you're describing but there is another type of for Loop that we will soon see but let's
3:00:42
come to that in just a moment other questions on Loops using while here
3:00:49
so I had a question about the flowcharts okay uh there were c yeah there were certain symbols for the certain kind of
3:00:56
the statements uh sir they are they certainly used for that kind of
3:01:02
statement that they are put they are so I deliber use anyone I
3:01:08
deliberately use certain types of symbols certain shapes here uh whereby in oval is conventional for start and
3:01:14
stop I used rectangles for any statement of code like an assignment or a printing
3:01:20
and so forth and I use diamonds to represent uh questions that you might ask uh conditions as we've seen um if
3:01:27
you're doing this for yourself if you're just trying to make sense of your code and writing it down you certainly don't need to use these formal symbols but I
3:01:33
tried to be consistent with some PR best practices and in fact let me come back to the same picture because this was the
3:01:39
first version of our picture but we've since modified our code a couple of times this recall was the version where the question we were asking was I not
3:01:46
equal to zero let me go ahead and just change this code now to represent the next version we did which recall changed
3:01:52
our logic to start counting from one it changed our question to check is I less than or equal to three but then
3:01:59
everything else was the same except for the counting which is now Plus instead of minus and then we refined it a little
3:02:06
bit further by counting now from zero up two but not through three and we
3:02:12
tightened up this code here by just incrementing one by using the slightly more succinct syntax so at this point
3:02:18
these flowcharts might become less and less useful for us because once you've wrapped your mind around the concept and
3:02:24
hopefully the picture helps bring that concept to life it's certainly fine to focus entirely on the code and only
3:02:30
think about or even draw something like this if you need to wrap your mind around something more complicated than
3:02:35
you're used to well let me go ahead if I may and propose that we transition to another approach of types of Loops using
3:02:43
another keyword here namely a for Loop and this is a word that does exist in other languages but doesn't necessarily
3:02:49
have as many features as other languages might use it for but there is a different type of loop not a while loop
3:02:55
but a for Loop and a for Loop is going to allow our allow us to express ourselves a little differently but to do
3:03:01
so I'd propose that the easiest way is if we introduce one other ID in Python which is that of a list and here too no
3:03:08
pun intended we're adding to the list of data types that python supports we've seen stirs or strings ins or integers
3:03:16
Floats or floating point value use bulls or Boolean Expressions python also has
3:03:21
lists which is another type of data but wonderfully this one's probably pretty familiar a list of things in the real
3:03:27
world is a list of things in Python it's a way of containing multiple values all
3:03:33
in the same place all in the same variable so what do I mean by this well let me propose that we go back to our
3:03:40
VSS code here and let me kind of start fresh with my code here and not use a while loop at all but let me use this
3:03:46
new keyword for the way the for Loop works is that it allows you to iterate over a list of items so what does this
3:03:54
look like it might look like this for I in the following list of items 0 1 2
3:04:02
this is my starting point and on each iteration of this Loop that is on each execution of this loop again and again I
3:04:08
want to print out meow now I'll admit I kind of like the look of this code
3:04:14
already even though there's some new syntax here because it's just short order than the while loop right the
3:04:19
while loop had multiple lines a moment ago and it was entirely up to me to decide what i is I have to check a
3:04:25
condition I have to increment or decrement I like I was doing a lot of work relatively speaking to make that
3:04:31
thing turn to make that Loop go and go it was very mechanical in a sense you can kind of in your mind's eye maybe see
3:04:38
the gears turning as all of these variables are uh changing and these questions are being asked a for Loop
3:04:45
kind of simplifies all of that and it just says if you want a variable like I a number and you know in advance how
3:04:52
many times you want this Loop to execute three times we'll just kind of specify what it is you want I to take on as
3:04:59
values explicitly in this loop I will be automatically initialized by python to
3:05:04
be zero then meow will be printed then python will automatically update I to
3:05:09
equal 1 then meow will be printed then python will automatically update I to B2
3:05:15
and meow will be printed and because that's it for the values in that list python will stop and it will only me
3:05:21
meow a total of three times what is the list the list in this program is exactly that 0 comma 1 comma 2 and notice the
3:05:29
square brackets those aren't parentheses those are square brackets that represent a list that's how you know visually as
3:05:35
the programmer that's how python knows as the language that you intend for that to be a list so let me go ahead and run
3:05:42
this python of cat. piy and it works just the same but it's only two lines
3:05:47
it's pretty readable once you have familiarity with that construct but to
3:05:53
my constant point about correctness not necessarily being the same as design in
3:05:59
what sense is this program perhaps poorly designed It's seems to work it meows three
3:06:06
times but why might this not be the best way to solve this problem even if you've
3:06:11
never programmed before again think about Corner cases things that may or may not happen think about extreme cases
3:06:19
that really test the quality of this code okay I think that because like we
3:06:24
can we are saying 0 one two which is three times and then like if you want to
3:06:31
print a million you say one two three yeah exactly and that's what I
3:06:37
mean about thinking about the extreme cases if you're trying to decide for yourself if your own code is good or someone else's code is good it might
3:06:44
look so at first glance but think about the extreme well what if it's not three things it's a million things I mean are
3:06:49
you really going to write out one Z through a million or 0 through 9 uh you
3:06:56
know 999,000 uh 999,999 like no you're not going to
3:07:02
write that many numbers on the screen there's got to be a better way so let's do the better way from the get-go rather
3:07:08
than set the stage for doing something poorly and the one way we can solve this problem to improve the design is don't
3:07:16
just manually specify ify the list of values use a function someone else's function that comes with python that
3:07:22
gives you the list you want and the easiest way to do that in Python is to use a function called range that returns
3:07:28
to a range of values it expects as input at least one argument and that number is
3:07:34
going to be the number of values you want back those values are going to start at zero and go to one to two and
3:07:41
so forth but they will go up to but not through the number you specify so by
3:07:46
specifying range three you're essentially being handed back one two
3:07:51
three values and by default those values are zero one and two and that's it but
3:07:57
what's brilliant about this is that now to Hope's point if I do want to meow a million times I mean that is an angry
3:08:03
cat I can now do a million by just typing a million I don't have to literally type zero comma one comma 2
3:08:11
comma 3 comma four all the way up to 999,999 I just do this so that's to be a
3:08:18
better way long term so that's indeed one Improvement we can indeed make here still using a for Loop but now using
3:08:25
this range function and just to show you something else that's pythonic this is not strictly necessary but it's commonly
3:08:30
done there's a minor Improvement we can make here even if we're just meowing
3:08:36
three times and notice that even though I'm defining a variable I I'm not ever
3:08:42
using it and it's kind of necessary logically because python Pres presumably
3:08:47
has to use something for counting right it has to know what it's iterating over but there's this convention in Python
3:08:53
where if you need a variable just because the programming feature requires it to do some kind of counting or
3:09:00
automatic updating but you the human don't care about its value a pythonic Improvement here would be to name that
3:09:06
variable a single underscore just because it's not required it doesn't change the correctness of the program
3:09:13
but it signals to yourself later it signals to colleagues or teachers are looking at your code too that yes it's a
3:09:20
variable but you don't care about its name because you're not using it later it's just necessary in order to use this
3:09:25
feature this Loop in this case here so just a minor uh Improvement or change
3:09:31
there but to really get you intrigued by what's possible in Python let's take
3:09:37
this one step further so if we really want to be pythonic this one if you've programmed before is kind of going to
3:09:43
blow your mind so to speak whereby if I want the cat to meow three times what if
3:09:49
I actually do this print open parenthesis quote unquote meow times
3:09:56
three all right you have to be kind of a geek to think this is cool but this is kind of cool so you can literally just
3:10:02
print what you want multiply it by the number of times that you want it and you
3:10:07
will get back exactly that result now I've kind of made a mistake here so
3:10:14
let's see what this does it's not quite as beautiful as this code might look to to to you to some of you to me let me
3:10:20
run python of cat dopy enter okay it's a really like Hungry Cat or something it's
3:10:26
meowing really fast but I can fix this I bet let's think about now some of the
3:10:31
basic building blocks we've discussed the problem is clearly that literally meow meow meow is being repeated three
3:10:37
times but it's not as pretty as I want it I want it to be meow meow meow on separate lines what might be a possible
3:10:44
solution here while still using this multiplication operator and think back
3:10:50
we've used plus to concatenate strings you can apparently use multiplication to concatenate strings but more than once
3:10:57
again and again and again how could I clean this up without reverting to my for Loop or my while loop and still use
3:11:03
multiplication in this way uh we can use a escape sequence which should did back
3:11:08
slash n amazing yes think back to back sln which is the way you as the programmer can express a new line in
3:11:15
code and I think if I take your advice I put a back slash n there inside of my quotes So that at
3:11:22
the end of every Meo W there's a new line let's see how this looks Let Me Clear My screen and run python of
3:11:29
caty okay so close I like this let me call on someone else the only thing I
3:11:34
don't like and I know I'm being really nitpicky now is that it's meow meow meow on separate lines but there's kind of
3:11:39
this extra blank line which I'm just not loving aesthetically I think we can uh make end
3:11:46
equal to column uh column not back n yeah so here too like all of these
3:11:52
things we've seen in past weeks are kind of coming together right recall that the print function lets you control what the
3:11:58
line ending is by default it's back slash n itself which is why at the very end of this print the cursor is being
3:12:05
moved again to the next line well we need to just override that so let me go into my code here and let me change this
3:12:12
to comma n equals quote unquote so that it's no longer the default back sln it's
3:12:18
instead now going to be uh nothing whatsoever that should eliminate then
3:12:23
hopefully that additional uh blank line so let me run this one last time here python of caty enter and there we have
3:12:31
it so now you know at least as programming goes it's kind of cool that I can distill this into a short line and
3:12:39
express myself all at once now to be fair it's a little less readable like now I've got back sln I've got time
3:12:44
three I've got n equals quote unquote so you don't have to do things this way my previous approach with a for Loop
3:12:50
totally fine my previous approach with a while loop totally fine and in some sense perfectly welld designed but this
3:12:57
is just yet another way to do it but it's not a good thing if you or your teacher your colleague your friend are
3:13:03
going to struggle to read your own code but this is a feature of python that some languages do not in fact have all
3:13:11
right well let me propose that things get more interesting still if we're not just swing three times only but we're
3:13:17
meowing some variable number of times let's ask the user how many times this cat should meow so let me clear the
3:13:23
screen here and let me figure out well how do I get a number from the user the
3:13:29
catch here is that if I want the user to give me a number I'm not doing math per se I'm meowing and therefore the user
3:13:35
has to give me a positive value the user has to give me a positive value so how
3:13:40
can I insist on this well if I just do this n equals int of input uh what's n
3:13:47
question mark well I want to check like I could say if n is less than Z like if
3:13:55
it's negative well I could do this well then ask again int input what's n
3:14:02
question mark okay well what if the user still doesn't give me a positive number what if they're being really difficult
3:14:08
they're not paying attention and they typed in two negative numbers well if n is less than zero well let's do it again
3:14:15
n equals right this does not end well you can't infinitely many times keep checking is it negative is it negative
3:14:21
is it negative right the program would never be done written so we can do this I think better maybe with a loop so let
3:14:28
me propose this a very common Paradigm in Python when you want to get user input that matches a certain expectation
3:14:36
you have that it's all positive that it's all negative or just something like that you just immediately say while true
3:14:44
you deliberately and a little dangerously but a very conv intentionally induce an infinite Loop
3:14:49
now what is an infinite loop it's just one that goes forever and we've seen how that can happen accidentally mathematically it's absolutely going to
3:14:56
happen when you say while true why well the answer to the true question is
3:15:01
always true so this is a way of deliberately inducing a loop that by default is going to go forever so we're
3:15:06
going to need a way of breaking out of this Loop when we have the number we want the convention though inside of
3:15:13
this otherwise infinite Loop is to ask the question you care about like give me an in by prompting the user for input like
3:15:19
what's n question mark and then just ask your question so if n is less than zero
3:15:25
then I think we want python to just continue to prompt the user again that is we want the code to stay in the loop
3:15:31
recall the input function and hope that the user gives us a better answer if this time around it's less than zero so
3:15:37
let's just literally use Python's keyword continue which says just that continue to stay within this Loop else
3:15:44
if it's not less than zero let's go ahead and just break out of the loop altogether using another keyword in
3:15:49
Python break break will break you out of the most recently begun Loop in this case if it's not the case that n is less
3:15:56
than zero so this will work and it will allow us to get a value that's zero or greater from the user but I think we can
3:16:02
tighten it up further so it's to not bother having an if and an else why don't we instead just say if n is
3:16:10
greater than zero go ahead and break in fact it's not that interesting a program if we even allow the user to type in
3:16:15
zero so let's wait and until they give us an integer that is greater than zero and then break out of this Loop and what
3:16:22
can I now do down here for I in range of whatever that value n is print meow and
3:16:30
honestly I don't need I here so let me come back to that principle before and let me just change it to an underscore just to be pythonic if you will so
3:16:37
what's going on lines 1 through four deliberately Implement an infinite Loop
3:16:43
that otherwise by default is going to go forever but I'm asking a question inside
3:16:48
of that loop after getting an INT from the user on line two I'm then checking is it greater than zero or is it zero is
3:16:56
it negative none of which makes sense for a meowing cat like I want the cat to meow at least one time so if it is
3:17:02
greater than zero break and this break statement even though it's indented indented twice has the effect of
3:17:09
breaking out of the most recently begun while loop so once the user gives you a
3:17:15
positive value then we get to line six at which point we meow that many times
3:17:21
because of line six and seven so if I run this now python of cat. Pi enter well what's n let's start with three
3:17:28
where we begin meow meow meow well this time let me go ahead and increase the size of my terminal window just
3:17:33
temporarily let me run python of cat. let me do it 10 times meow 10 times now
3:17:39
appears on the screen and the takeaways here are not just that we can meow 10 times or do something again and again
3:17:45
but this is a very common Paradigm in Python when you want to do something again and again and again but only until
3:17:52
the user actually gives you a value that you care about here and let me propose
3:17:58
actually now that we practice a little more what we've been preaching especially when it comes to say
3:18:05
especially when it comes to say writing your own functions you know now that I'm doing all this meowing it might be nice
3:18:10
to actually have a meow function that the inventors of python didn't Envision so let me do this let me actually get
3:18:16
rid of this code and let me go ahead and do this let me go ahead and say Define a main function as I've done before and
3:18:23
let me just blindly call meow 3 meow doesn't exist yet but when it does that'll be great so let me go ahead now
3:18:30
and Define meow so my meow function should take as input a parameter called
3:18:36
n or anything I want and this part's pretty easy now how do you meow in times
3:18:41
well for underscore in the range of n Go ahead and just print meow so same code
3:18:46
AS before nothing new here I'm just putting that logic inside of a meow function that's going to have this side
3:18:52
effect of printing meow and now as before let me go down here and let me make sure I call Main and if I now run
3:18:58
this code python of cat. meow meow meow it's always going to do three because I've hardcoded the
3:19:05
three well let's make one Improvement here let me go ahead now and maybe do this uh let me ask the user for a number
3:19:13
so let's say something like this number equals get number all right unfortunately there is no function in
3:19:20
Python called get number that gets a positive number from the user but I can invent that so Define get number open
3:19:27
paren close per n and then inside of this function let me do this while true go ahead and get a number from the user
3:19:34
converting it to an INT asking them what's n question mark and then if n is
3:19:39
what I want it's a greater than zero value a positive number I don't want to break this time necessarily
3:19:47
although I could I instead want to return the value so I can actually do this instead and this two is a feature
3:19:55
of python this ability not to just break out of a block of code but also to
3:20:00
return a value in code to actually return a value gives you the ability ultimately to return explicitly a value
3:20:08
so that your function has not just a side effect necessarily but it actually hands back just like input does just
3:20:15
like int does just like float does an actual value to the user now to be clear
3:20:20
I don't have to return n here I can still break out of the loop as I've done in the past with code like this but then
3:20:27
after the loop I still have to return n and so what's happening here is that if you use break to get out of the loop but
3:20:34
you need to hand back a value from a function you still have to use the return keyword now explicitly either in
3:20:40
the loop as I did or now outside of the loop but still inside of the function
3:20:47
the last thing I'm going to do here now is change that three which we hardcoded earlier to actually be the value of the
3:20:53
variable we've gotten from the user so that now down here if I run python of cat. py enter what's N I can type in
3:21:00
three I get my three meows or if I only want one I now get one meow instead all
3:21:06
right so if we now have this ability to do things again and again in these Loops let's see if we can't solve some other
3:21:13
problems via which to express ourselves cyclically but get back some interesting answers as well let me propose for
3:21:20
instance that we look a little more closely at these lists it turns out that in Python and really in programs in
3:21:25
general it's useful to have a list of values because we're going to be able to work with more and more data larger and
3:21:32
larger data sets so let me propose that we come back to vs code here and let's do something that's perhaps a little
3:21:37
familiar to some folks um the world of Hogwarts and let me go ahead and code up a file called Hogwarts and let's see if
3:21:44
we can't have a list of students at Hogwarts here so I have a new tab called hogw Works sty and let me go ahead and
3:21:51
propose that I just Define in this program a list of students whose names I know in advance so I'm not going to get
3:21:56
user input for now I'm just going to know from the GetGo that the three students I want to consider are these a
3:22:02
variable is going to be called students it's going to equal as I've done in the past a square bracket which means hey
3:22:08
here comes a list and those values are going to be Hermione in quotes because it's a string uh Harry in quotes cuz
3:22:15
it's a string and then WR in quotes because it's a string as well so this is a list of length three it's similar in
3:22:21
spirit to my list of length three earlier but that had three ins 012 now I have a list of three strings instead and
3:22:29
this isn't very useful at the moment but let me just do something as a check for myself let me print out each of these
3:22:37
students well wait a minute how do I print the contents of a list well in the
3:22:43
past when we've printed a variable we've just printed out the name of the variable but I don't want to print out
3:22:49
all of Hermione and Harry and Ron all at once maybe I want to print out Hermione first then Harry then Ron so I need a
3:22:57
way to express more precisely which value do I want from this list and the way you do this in Python is you use
3:23:04
square brackets in another way if you have a variable in this case called students and you want to go inside of
3:23:10
that variable and get a specific value that is to say you want to index into the list you use square brackets this
3:23:17
way using numbers inside of the square brackets and here's where we see that it
3:23:22
is useful to think and count in terms of zero on up instead of one on up these
3:23:27
lists in Python are shall we say zero indexed the first item in a list is at
3:23:34
location zero the second item in a python list is at location one and the third is at location two so you're
3:23:40
always kind of off by one mentally but you get used to it if you've never programmed before over time so let me
3:23:45
print out all three students so let me print out students bracket zero then students bracket one then lastly let me
3:23:51
print students bracket 2 and this is my third and final line and of course if I run this code it probably does what you
3:23:57
would guess if I run python of Hogwarts stpy there's Hermione Harry and Rob each
3:24:03
on their own lines there but there's got to be a better way right especially if I don't know in advance who's going to be
3:24:08
in this list if next year there's some new students at Hogwarts we can use a loop to do something automatically
3:24:14
without having to manually type out zero and then one and two well here's another feature of python you can use a for Loop
3:24:21
not just to count from zero to 1 to two you can use Python to just iterate over anything not just numbers but strings so
3:24:28
I could actually do this for student in students colon and then indented
3:24:35
underneath that I can say print student now it doesn't matter if I have three students or four or 400 this two lines
3:24:43
of code this Loop will print all of those students for me one at a time so if I now run python of Hogwarts there's
3:24:50
the same list but I don't need to know in advance how long that actual list is
3:24:55
now notice I made a conscious decision here I didn't call this variable
3:25:00
underscore because this time I'm using the variable and while I could do this
3:25:06
now no no no no your code is getting way too cryptic if you're naming the variable underscore and you're using the
3:25:12
variable underscore now you're helping no one now you're confusing the reader yourself in the down the line you should
3:25:18
call your variables what they are so an very appropriate name though I'm sure you could come up with others would be
3:25:24
student and here you could say you would say student as well if you'd prefer to be more succinct it's not unreasonable
3:25:30
to do something succinct in a loop like this for s in students using maybe the same letter that the list itself begins
3:25:37
with but again why bother python is meant to be more readable if you have a list of students iterate over them one
3:25:43
student at a time let me pause here to see if there's now questions about lists as I've now defined them a list of
3:25:50
strings in this case or using a for Loop now to iterate over and print each of
3:25:55
those names yeah uh so is it not necessary to initiate student in this
3:26:01
case or we can just declare a variable in the loop good question you do not need to manually initialize it python
3:26:07
takes care of initializing the student variable to Hermione first then Harry
3:26:12
second then Ron third unlike other languages you don't need to initialize it to something yourself it just exists
3:26:17
and it will work other questions on loops and lists in this way since you
3:26:22
describe break so is there any concept of continue so that we can skip a particular case in Loops yes you can
3:26:28
continue using another syntax as well we haven't shown that for now we focused only on break H okay sure uh can can
3:26:35
this follow work with either hash tables or different kind of fight tables or arrays uh indeed so we're getting ahead
3:26:42
of ourselves there but there are yet other types of data in Python and indeed you can use a for Loop to iterate over
3:26:48
those as well anything that is iterable so to speak is a piece of data that can be used with a loop like this but more
3:26:55
on those more on those soon in fact let me transition here to show just another way of solving the same problem because
3:27:02
up until now when we've used Loops we really have relied on numbers and that's fine if you prefer to sort of stay in
3:27:07
that space suppose I did want to iterate using numbers like I and 0 1 2 and so
3:27:13
forth let me propose that we could change this code AS follows if you would prefer to think about or if the program
3:27:19
you're trying to implement requires that you use numbers like this you might do this for I in well I don't want to just
3:27:26
say students because then I is not going to be a number I is going to be
3:27:32
literally Hermione then Harry then Rob I need to iterate from zero to one to two
3:27:40
right if I know a list with three elements has these locations 0 1 2 I need to create a loop somehow that
3:27:46
starts at zero and ends at two previously when I wanted to do that I needed range but this two is not going
3:27:52
to work I can't just say in the range of students because students is not a number it's not an integer so you can't
3:27:59
pass it to range range expects an integer but there is a solution here it
3:28:05
turns out that there is a function in Python called length or Len Len that
3:28:11
will tell you the length of a list and other things down the line too and now I
3:28:16
think I can assemble these building blocks in a way that can allow me to use numbers in this way so range doesn't
3:28:22
take a list of strings it takes a number and ideally that number is going to be three so I get a range of values 0o 1
3:28:30
and two so I think I can Nest my functions like this if I first get the
3:28:35
length of the student list that's going to be three then I pass that return
3:28:40
value as the argument to range that's going to give me back a range of value zero then one than two and what that's
3:28:47
going to allow me to do then in code if I want is not just this I could do print
3:28:53
now students bracket I and this is now where the syntax we're seeing is getting
3:28:59
very expressive new and perhaps unfamiliar but if I can do Open Bracket zero close bracket or Open Bracket one
3:29:07
close bracket or Open Bracket 2 close bracket turns out I can actually put a variable in there and I can express any
3:29:14
number inside of those brackets so it's to print these all out dynamically in a loop let me do this python of Hogwarts
3:29:20
enter there's Hermione Harry and Ron and now if I'm just curious I I just want to
3:29:25
poke around or maybe I want to do a ranking like who are the top three students in the school or in Gryffindor
3:29:31
well I can print multiple things at a time we've seen let me print out not just the students at location I but
3:29:38
rather let's print I first and then the student at location I so two things to print and we know that print can take
3:29:45
two arguments we've seen that before they'll be separated by a space let me go ahead and rerun this now I see that
3:29:51
okay hermion is the top student but she's in zero place that's a little weird like we don't need to show the
3:29:57
human using my program that we started counting at zero I can clean this up I can just add one to the eye up here and
3:30:04
now we see sort of a top three list of students hermion is number one Harry's number two and of course Ron is number
3:30:10
three so we can get access to all of those same values as well all any questions now on on these
3:30:17
lists any questions now on these lists this length these ranges or
3:30:23
otherwise my question is uh for I in range can you explain this once more uh
3:30:31
sure still so let me rewind in time we started off doing this for I in
3:30:39
012 and then we print it out meow three times in that way the way that the for
3:30:45
Loop works is that it creates for you a variable that I've called I but I could call it anything I want it then assigns
3:30:52
I initially to the first thing in the list it then automatically assigns I to the next thing in the list and then it
3:30:58
assigns I to the third thing in the list and each time it does all of the indented code
3:31:03
underneath we realize though that this is not going to scale well if I want to do something like a million times so we
3:31:10
introduced range instead that has the effect of doing the same thing it returns to me a Range of values a list
3:31:17
of three things really so the behavior is exactly the same if we now fast forward to this Hogwarts example now
3:31:23
though what I'm doing is just combining these smaller ideas I'm still creating a for Loop I'm still creating a variable
3:31:30
called I I want to do it over a range of values but how many values well if I use the length function and pass to the
3:31:37
length function the list of values lengths purpose in life is to tell me how long is this list and it's three so
3:31:44
that's almost as though before I had just done something like this but I don't want to hard code three I want to
3:31:51
dynamically figure out how many students are at Hogwarts so I'm just composing composing composing or nesting all of
3:31:57
these various ideas all right if I may let me transition now to hog in Hogwarts
3:32:02
still to introduce one final type of data before we combine everything with a few final programs it turns out in
3:32:09
Python there's not just strings not just ins not just floating Point values not
3:32:14
just bulls not just list there are also what are called dictionaries or dicts which are a data structure that allows
3:32:21
you to associate one value with another literally a dictionary like in the human
3:32:27
world if you were to open an a dictionary be it in English or any other human language what's inside of a dictionary well it's a bunch of words
3:32:34
and definitions a computer scientist though and a programmer would describe those more generically as keys and
3:32:41
values something associated with something else that's all a dictionary is it allows you to associate something
3:32:48
with something else and notice this is already more powerful more interesting than a list a list is just a set of
3:32:54
multiple values but a dictionary is sort of two-dimensional if you will just like
3:32:59
a human dictionary a book it Associates something with something else like words with their definitions now what does
3:33:06
this actually mean in practice well suppose that we wanted to keep track of
3:33:11
who is in what house at Hogwarts well I could do it using lists alone let me go
3:33:17
back to vs code here and let me just temporarily but in a way that I'm not going to like ultimately let me create
3:33:23
another variable called houses set it equal to uh Gryffindor corresponding to
3:33:28
herm's house uh Gryffindor corresponding to Harry's house and Gryffindor corresponding to Ron's house and let's
3:33:34
add Draco in there so we now have four instead of three students just so we have a little variety and he was in uh
3:33:41
Slytherin so now we have two lists and we could just agree amongst ourselves
3:33:48
that whoever is first in the students variable lives in the first uh value in
3:33:53
houses whoever is second in students lives in the second house whoever third in students lives in the third house we
3:34:01
could do that but honestly that is going to break down quickly when we have a lot of students when we have a lot of houses
3:34:07
and what if we want to keep track of more things than that what if we want to keep track of every student's house and the Patronis this uh this image that
3:34:14
they conjure up magically well then we need a third list like this is just going to get messy quickly if
3:34:20
we're just on the honor System using multiple lists where everything lines up
3:34:25
logically it doesn't end up well when your code gets more complicated but I do want to implement this idea I want to
3:34:31
associate something with something a student with a house a student with a house a student with a house and so
3:34:36
forth so how can I go about doing this well let me go back to my code here and
3:34:41
let me propose that we do this using a python dictionary and this is the last of the new syntax really that we'll see
3:34:49
here's the new syntax instead of using square brackets we're going to use curly braces for dictionaries as well we've
3:34:56
seen curly braces in the context of f strings completely unrelated sometimes you run out of keys on the keyboard and
3:35:02
the authors of a language need to start reusing symbols in different ways that's what's about to happen we're using curly
3:35:08
braces in a different way now so let me create a variable called students and let me go ahead and set it equal to open
3:35:15
curly brace and Clos curly brace this is an empty dictionary at the moment and
3:35:20
here's how a dictionary works it allows you to associate something with something else and you do that like this
3:35:25
Hermione quote unquote colon and then the value thereof
3:35:31
what do you want to associate with Hermione well Gryffindor what do I want to associate Harry with well I want to
3:35:37
associate him with Gryffindor what do I want to associate Ron with well I want to associate him with Gryffindor well
3:35:44
this is actually not going to this is going to get very ugly quickly once we add in Draco and Slytherin my code is
3:35:50
going to get too long it's going to start wrapping so this is purely aesthetic it is perfectly acceptable in
3:35:55
Python and other languages to format your code a little more readily and just add new lines if it makes it more
3:36:00
readable and one way of doing this might be as follows I still have my curly brace up here I still have my curly
3:36:06
brace down here but notice it's a little more readable now in that I have my keys
3:36:12
on the left my something and my values on the right my other something it's just a little easier to skim top to
3:36:18
bottom you could format it differently as well but I'm going to go ahead and add in now uh Draco who lives of course
3:36:25
in in Slytherin so now I have each of these keys on the left and values on the
3:36:31
right which is really again just a code implementation of this idea a little chart that you might write up with paper
3:36:38
pencil when associating something with something else so how do I now use this code in an interesting way the syntax is
3:36:44
almost the same if I want to print out the very first student herm's house I could do this print out the name of the
3:36:52
variable but I need to go inside of the variable I need to index into it and
3:36:57
what's neat about dictionaries is that whereas lists have locations that are
3:37:03
numeric zero 1 2 Hermione Harry Ron respectively dictionaries allow you to
3:37:09
use actual words as your indices so to speak your indexes to get inside of them
3:37:15
them so if you want to print out herm's house the key you care about is quote
3:37:20
unquote Hermione and what this syntax here will do notice it's not a number
3:37:25
zero or one or two it's literally herm's name this is like going to the Chart
3:37:30
earlier and saying all right give me uh Hermione is my key Gryffindor is the
3:37:36
value that's what we're doing here syntactically we're looking up hermion and getting the value thereof so if I go
3:37:42
back to my code that should print out Gryffindor and if I do this a few times students bracket quote unquote Harry
3:37:48
should give me Harry's house print students Open Bracket Ron that should give me Ron's house and then lastly if I
3:37:54
do this with students bracket Draco that should give me draco's house now it's a little manual still I'm bet we can
3:38:01
improve this but let me run python on Hogwarts sty and we should see Gryffindor Gryffindor Gryffindor
3:38:06
Slytherin which is exactly what we'd expect now all we've done again is we've just now moved from having just a simple
3:38:13
list of names to again sort of two Di ions associating like we would on paper pencil something with something else
3:38:19
keys with values respectively allow me if you will even though I realize this is getting a little fancy allow me to
3:38:26
escalate things slightly here and transition from looking at just for
3:38:32
instance uh that pattern there just hardcoding those values there to actually printing these out more
3:38:38
dynamically let me go ahead and use our Loop and this question came up earlier as well let me go ahead and say for each
3:38:44
student in students go ahead and print out for
3:38:50
instance the students variable at well let's just say student first let's keep
3:38:56
it simple so this is not going to be that interesting yet but when I run python of Hogwarts upy and hit enter
3:39:02
notice what should I see let me take a question here to see what am I going to
3:39:07
see when I hit enter now when I'm doing for student in students yeah I think we
3:39:13
we we will only see Keys perfect so good intuition it could have gone both ways could have been values the houses but
3:39:19
when you use a for Loop in Python to iterate over a dictionary by design it
3:39:24
iterates over all of the keys so we should see I think Hermione Harry Ron
3:39:30
and Draco let me hit enter now enter and indeed you're exactly right we see just the keys but that's not really that
3:39:37
useful if what I really care about is who lives where can I print out both well I think I can let me go ahead and
3:39:43
do this let me print out not just the students name the key but let me use the
3:39:49
key their name to index into the dictionary right if I know the word in
3:39:54
the dictionary let me look up its definition if I know the student's name let me look up their house and the Syntax for this just like a list is
3:40:02
students bracket and just like in the past we used I when I was a number we
3:40:07
can also with a dictionary use a string so if the student's name is the key then
3:40:16
this syntax students Open Bracket student close bracket will go to hermion
3:40:23
location and get back her house we'll go to Harry's location and get back his house and so forth so if I do python of
3:40:29
Hogwarts enter now I see Hermione Gryffindor Harry Gryffindor Ron
3:40:34
Gryffindor Draco Slytherin now it looks like I've given them all new last names but I can clean that up this is just a
3:40:39
print thing let's go ahead and change our separator from the default space to maybe a space comma and just using print
3:40:46
features now let me run the same program again enter now I've just got some nice pretty commas in there to make clear
3:40:52
that herm's last name is not in fact Gryffindor but that's just a print detail any questions then on these
3:40:58
dictionaries and what I've just done questions on these dictionaries and
3:41:04
this looping over them here um I just can't
3:41:09
get my head around the uh for student in students does uh if I'm just correct me
3:41:16
if if I'm right does that mean it Imports the list of students and uses
3:41:23
the indexes in other words herione Harry and Ron as the indexes in the actual um
3:41:32
the list of students correct so this is just a feature of python when you use a for loop with a dictionary what happens
3:41:39
is this if this is the dictionary here with the keys on top and the values on bottom you get to choose what the
3:41:44
variable called I called my variable student just because it makes sense because I want one student at a time and what the for Loop does just like it did
3:41:51
with numbers before the zero the one and the two it allows me to for instance set student equal initially to herm's name
3:41:59
and then the next iteration of the loop the next cycle sets student equal to Harry's name then Ron then Draco it just
3:42:06
kind of happens automatically like that is what the python interpreter does for you when it sees a for Loop like that so
3:42:12
it's very similar in spirit to iterating with a for Loop Loop over a list but rather than iterate over the numeric
3:42:18
location 012 it iterates over the boldfaced keys in this representation
3:42:24
here graphically and allow me to give us one other example on Hogwarts before we look at one other familiar uh domain at
3:42:32
the risk of things escalating a little bit let me propose that we continue the story with one final Hogwarts example
3:42:39
like this what if we have more information about each of our students
3:42:44
and this is kind kind of inevitable right if you're implementing a program that's a database with people or customers or employees or anything else
3:42:51
you can imagine having a lot of data about anything you're representing in your program here for the sake of
3:42:57
discussion suppose that every student at Hogwarts of course has a name they have already a house but they also have a
3:43:04
Patronus for those unfamiliar this is the animal or entity that comes out of the end of their wand when they make a
3:43:09
Certain Magical spell the point here being is that we want to associate not just one one thing with the student but
3:43:18
multiple things as well their name their house and their petronus in this case
3:43:23
well what might code like this look like well let me go back to Hogwarts toy and let me start fresh for just a moment and
3:43:30
let me propose that I enhance this with a bit more data and this data is going to look as follows my students variable
3:43:37
now I'm going to propose we think of it as a list what if we have a list of
3:43:43
dictionaries as follows indeed I want to literally implement this picture here so
3:43:48
notice that my previous picture just represented a single dictionary but suppose I wanted to compose a list of
3:43:55
dictionaries that is four students so a list of four students and suppose that each of those students is itself a
3:44:03
dictionary a collection of key value pairs keys and values something and
3:44:10
something else well here's one other way we can do this in code let me go back to s code here and let me Define a variable
3:44:18
called students that is equal to a list and I'm going to preemptively move my
3:44:23
cursor onto separate lines because I know this is going to be long and I want to fit all of the elements of this list
3:44:29
inside of it I'm now going to create a dictionary one dictionary per student and how do I create a dictionary I just
3:44:35
use those curly braces but it's up to me to Define what those keys are and let me propose that one key this time won't be
3:44:42
the student's name explicitly it will literally be the word name and they're going to have the name Hermione this
3:44:48
same student is going to have another key called house and the value is going to be Gryffindor and the same student's
3:44:55
going to have a third key called petronis and the value of that is going to be I had to look it up in otter
3:45:01
according to the book now I'm going to create a second dictionary inside of this list and again a dictionary is like
3:45:07
literally like the human dictionary of words it's a book that contains keys and values words and definitions what are
3:45:14
the three words I'm storing in each of my dictionaries name house and petronis what are the definitions of those words
3:45:20
for Hermione Hermione griffindor and Otter respectively for Harry the
3:45:26
definitions are going to be different in this new dictionary let me give myself another pair of curly braces and say
3:45:31
this name quote unquote colon Harry uh house here is again going to be
3:45:37
Gryffindor and this one I I knew his Patronis is going to be in this case a
3:45:43
stag all right next a third dictionary the name here will be Ron and I'm going
3:45:48
to go ahead and do that just like this next I have the house and he too was Gryffindor lastly had to look this one
3:45:55
up Ron's petronis was a Jack Russell Terrier
3:46:02
lastly is Draco in a third in a fourth dictionary now so another pair of curly
3:46:07
braces the name of the student is of course Draco the house of this student is
3:46:13
Slytherin and dra interestingly enough at least according to the internet has no Patronus was
3:46:20
never revealed in the books or the movies so it turns out this is actually a wonderful teachable moment there is a
3:46:26
special keyword in Python that is literally none n o n e with the first
3:46:32
letter capitalized this represents officially the absence of a value so I
3:46:37
could a little sloppily do something like quote unquote but does that mean I didn't get around to typing it or not
3:46:43
it's a little clear semantically to say literally none a special keyword in Python to make clear that I know uh
3:46:51
Draco has no Patronis it's not just an oversight on my part now that I have
3:46:56
this what do I have in the computer's memory I have a list how do I know it's a list because I see a square bracket at
3:47:03
the beginning and another square bracket at the end that's just my visual clue okay I don't know necessarily what else
3:47:09
is going on here but there's a list of something what is in that list well here
3:47:14
two the syntax is our clue because this line two starts with a curly brace and ends with a curly brace I just know that
3:47:22
is a dictionary a collection of key value pairs now this all fit on my screen perfectly so I didn't bother
3:47:28
moving all of the key value pairs onto new lines it would have made it really tall so I I kept it all together here
3:47:34
this time but how many keys does this first dictionary have put another way in
3:47:39
her mayane physical dictionary how many words are in that dictionary three the words are name house and petronis what
3:47:46
are the three definitions or values of those words in herm's dictionary Hermione Gryffindor and Otter
3:47:53
respectively and the same story goes for Harry then for Ron then for Draco I have
3:48:00
by Design chosen to give them dictionaries that have all the same Keys
3:48:05
all the same names but they all have unique values and that's my design
3:48:11
That's My Prerogative as a programmer so why is this useful at the end of the day now I have access to a whole collection
3:48:18
of interesting data about all of these students and I can still do a loop I can
3:48:23
say for student and students that's going to allow me to iterate over this list of students and let me go ahead and
3:48:29
print out just one thing at a time let me print out the current Student's name so as complicated as the dictionary is
3:48:36
this should be pretty comfortable four student and students is just going to iterate over every student in the list 1
3:48:41
2 3 4 total the next line is just going to print out the value of the name key
3:48:47
it's like opening a physical dictionary looking up the word name and giving us Hermione Harry Ron and Draco
3:48:53
respectively from each dictionary so if I run this version of Hogwarts and hit enter there I get all three of their
3:49:00
names but what if I want more information than that I want both their names and their houses well just add to
3:49:06
prints arguments student Open Bracket uh House close bracket all right let's go
3:49:12
ahead and run this python of Hogwarts dopy and hit enter so I now see Hermione Gryffindor Harry Gryffindor and so forth
3:49:19
well we can aesthetically clean this up a little bit by adding a separator with print like a comma in a space just so
3:49:25
that when I run this again I now see some commas separating these values but recall that students have not just a
3:49:30
name not just a house but also that Patronis so if we want to print out that too we now have the syntax via which to
3:49:38
go into that same dictionary for each student and output their Patronus as
3:49:43
well as their house and their name so if I run this program one final time now I see all of the data in this here
3:49:50
dictionary so this is a lot to absorb all at once I'm sure it's the last of our new data types on top of lists we
3:49:57
have these dictionaries but again a dictionary at the end of the day is just a collection of values similar to these
3:50:04
values here that allow you to associate keys with values and the first version of this program Associated literally the
3:50:11
students names with their houses but then I realized in my next version wait a minute what if every student has not
3:50:17
just a name in a house but a Patronis let's actually standardize the names of our keys to be name house and Patronus
3:50:25
and then the values of those keys can actually be the data like Hermione Gryffindor otter and so forth questions
3:50:32
now on these dictionaries and iteration thereof I just was wondering if the
3:50:38
suppose the dictionary is very huge and if I want to look up for a specific
3:50:44
student so how do I know uh where to look that student from like can we sort
3:50:50
it out in alphabetical order or numeric order or anything like that in short
3:50:55
answer yes one of the features of python is that it makes these dictionaries very highly performant for you that is even
3:51:02
if they're very large as they will be in future weeks when we manipulate more data python will find the data you care
3:51:09
about quickly for you and in fact that is a feature of the language that is a feature of a dictionary to get you the
3:51:15
data quickly and there are functions that you can use you can sort the data you can sift through it you can do very
3:51:21
performant operations as we eventually will allow me then to propose as we wrap
3:51:28
up these Loops that we solve just a few final problems that will perhaps evoke fond memories of yester here at least
3:51:34
for me where in one of my favorite games growing up was this one here on the original Nintendo and this is a
3:51:39
two-dimensional world where the characters move up down and right not so much to the left in jumping over
3:51:46
pyramids and obstructions like these and allow me to propose that we use this just for inspiration not to do something
3:51:51
that's quite as colorful or graphical as this but just to focus on for instance this barrier in the middle of the world
3:51:58
here that Mario or Luigi had to jump over and so this here seems to be like
3:52:03
three bricks stepped on top of one another and we won't do things quite graphically but let's just Implement a very simple python based version of this
3:52:10
textually using maybe just hashes for bricks because there's a pth pattern here one on top of the other and I bet
3:52:17
we can solve this in any number of ways well let me switch back over to vs code here and let me propose that we create a
3:52:23
program called mario. using code in the terminal window and then up here let me
3:52:29
start by implementing that same picture as simply as I can printing out just literally the hash and then the hash and
3:52:36
then a third final hash this is going to be a very textual approximation of it but I think if I run python mario. I've
3:52:43
got a very simple version of that same column of bricks so to speak but you can
3:52:49
imagine that certainly in a game where maybe these uh The Columns get higher or lower it would be nice to write code
3:52:56
that's actually a little more Dynamic than that and doesn't just use print print print which is literally copy and
3:53:01
paste it would seem so let me at least adopt some of today's Lessons Learned and instead do something like this for
3:53:08
underscore in range of three let's now print out just one of these at a time
3:53:13
but the fact that I've now used a three to range means if I want to change it to something bigger or smaller I change it
3:53:19
in one place not in three or more places and this code two of course if I got it right is just going to print out the
3:53:27
exact same thing so we're iterating here but let's see if we can't now integrate our discussion of writing functions of
3:53:33
our own to begin writing something a little more Dynamic and solving more complicated problems ultimately one of
3:53:39
the nice things about functions is that they allow us to not just write code that we can use and reuse they allow us
3:53:45
to create abstractions if you will an abstraction is a simplification of a potentially more complicated idea and
3:53:52
we've seen this a few times over the course of the weeks for instance we had a function called hello which granted
3:53:58
didn't do all that much it just printed hello but it allowed me to think about the function as exactly what it does not
3:54:04
generically printing something but literally saying hello I've been able to get a number using something similar by
3:54:11
defining my own function like get number well let me go ahead and for instance assume for the moment that I've had the
3:54:17
forethought to uh in my function main use a function called print column that
3:54:23
seems as good a name as any to use a function that prints a column of bricks
3:54:28
well how can I go about now implementing this abstraction this simple idea print column with actual code well we've seen
3:54:36
before with def we can do just that let me Define a function called print column let me accept as its input uh
3:54:42
generically speaking a parameter called height I could call it n or H but I'll be a little more explicit now with
3:54:47
height just so I remind myself what it's doing and now I think I can just borrow some of that same code from before for
3:54:54
underscore in range of height go ahead and print out a single hash and then at
3:55:01
the end of this whole program let's just call Main so I've kind of complicated the code it doesn't do anything more
3:55:07
just yet but it's setting me up for solving what I think are going to be more sophisticated problems if I run
3:55:13
python of Mario up high we're back where we began but I now have a function an abstraction print column that's going to
3:55:21
allow me to think about printing some chunk of the world of Mario at a time
3:55:26
and I can do this in different ways too notice that if I really want I could do something like this I could reimplement
3:55:33
now print column in different ways especially if I am using print column all over my code or maybe still a
3:55:39
colleague of mine a friend someone else on the Internet is using my print column function what's also nice about
3:55:46
functions you've written is you can change the underlying implementation details of them but so long as you don't
3:55:52
change the name of the function or its parameters or what it returns if anything no one else knows the
3:55:58
difference you can change the internal implementation as much as you want if you want to improve it or make fixes
3:56:04
over time so for instance another way we could Implement print column recall would be something like this a bit
3:56:09
clever with one hash and then a new line and then maybe we could do multiplication strings and then end this
3:56:15
line with quote unquote again it's okay if you're not comfortable with this syntax this was a more clever approach
3:56:21
we saw in the past but if I run python of myoy here I'll still see a column of
3:56:27
three but what's important here is that main does not need to know that the underlying implementation of print
3:56:34
column has changed well let's transition to a different dimension if you will and
3:56:40
rather than print out just these vertical bricks let's fast forward in the game to this part of the world here
3:56:45
at some part mar Mario encounters these bricks in the sky that if he jumps up underneath they become coins and so he
3:56:51
he gains to a score but let's go ahead and focus only on those coins and let me propose that we print out oh just these
3:56:57
four question marks here and let me go back to VSS code here and let me propose that within VSS code here just like
3:57:04
before we try to abstract this away so let me go ahead and get rid of this version cuz we're now going horizontal
3:57:10
instead of vertical with our output and let me just say well print row four
3:57:16
times let me just abstract away the problem at hand I don't know yet how I'm going to print those four question marks
3:57:22
but let's call it print row four and I'll assume I'll now solve this problem let's now go down that rabbit hole of
3:57:29
solving the problem Define a function called print row it's going to take a width instead of a height because it's
3:57:35
horizontal instead of vertical and how can I do this well now we have an opportunity to do string multiplication
3:57:41
even more elegantly I can say quote unquote question mark times with and
3:57:47
this is a very pretty pythonic way of printing what could otherwise be a loop and that's fine but this is going to go
3:57:53
ahead and print those question marks for me let's do python of mario. enter and now I've got four question marks it's
3:58:00
not nearly as pretty as the more graphical version but it is at least uh
3:58:06
a building block toward having now a reusable function like print row and why
3:58:11
am I doing all this like why are we over engine engering the solution to these problems by having print column and
3:58:17
print row well it's a useful problem solving technique as soon as your world does not look one-dimensional like this
3:58:24
or with the column version but what about this later in Super Mario Brothers does Mario have to jump down into this
3:58:31
world where there's a lot of these underworld barriers and this one here for instance looks like a square it's
3:58:36
two-dimensional there's a height and a width to it and that is to say there's a bunch of different ways we could
3:58:42
implement this thing if maybe for discussion it's like a 3X3 grid a 3X3
3:58:48
square of sorts well how can we go about solving this here problem well let me propose we come back to vs code and let
3:58:55
me propose that we think about this in a couple of different ways I could do this
3:59:01
H like this if I if I know where I'm going you know maybe I'm a seasoned programmer let me go ahead and do this
3:59:08
let me print out a square the width and the height of which is three that's an abstraction I'm just taking for granted
3:59:13
for moment that there is already a function called print Square that's going to be width three and height three
3:59:19
as well but someone's got to implement this and at the moment there's only me at the keyboard so let's go ahead and
3:59:24
Implement that square let me go ahead and Define a function called print square that takes in a specific size
3:59:31
both for height and for width and here's where we have an opportunity to use some of those loops and we can use those
3:59:37
Loops in a way we haven't yet if I want to print out all of these rows but also
3:59:43
all of these columns I now have to think not just cyclically like a loop allows but I need to think two-dimensionally
3:59:50
and if you're familiar with like an old school typewriter or even a printer nowadays It generally prints from top to
3:59:56
bottom so even if you have multiple columns you print out one line at a time
4:00:01
and while you're on that line the printer or the typewriter prints from left to right and that's kind of the
4:00:06
mental model to have with your black and white terminal window all of the output for every example thus far starts at the
4:00:13
top and goes down to the bottom from top to bottom left to right so we have to generate our output our Square in that
4:00:21
same way so let me propose that we do this let me propose that we know we need to iterate this many times three or more
4:00:27
generally size so let me do this for I in the range of size what do I need to
4:00:33
do three times Well I want to print out what one two three rows of bricks but
4:00:41
within each row of bricks what do I want to print one two three bricks
4:00:46
specifically so if we go back to our diagram here and I stipulate that it's indeed meant to be a 3X3 Square three
4:00:55
wide and three tall what do I want to do to print the first row I want to print brick brick brick brick brick what do I
4:01:03
want to print on the second row brick brick brick and the third row brick brick brick so I'm doing three things
4:01:10
three times there's a lot of printing that must happen so so let me go back to my code here and let me propose now that
4:01:17
we think of this outer loop that I've just started as representing each of our
4:01:23
rows for I in range of size is going to ensure no matter what I do next that I
4:01:29
can print out one two three rows or more generally size where size could be three
4:01:36
but it could be smaller or larger what do I want to do on each of the rows well just like an old school typewriter or
4:01:42
printer on each row I want to print out brick brick brick brick brick brick
4:01:47
brick brick brick well that sounds like a cycle some kind of loop so maybe I can have inside of one Loop another loop I
4:01:55
don't want to use I again because I don't want to use the same variable and mess up my counting so I'm going to by
4:02:00
convention use J very common to use I and then J maybe K but after that you
4:02:05
shouldn't keep nesting inside of each other let me go ahead and say for J in range of size two because it's a square
4:02:12
and then each of these rows let me print out a single hash but no new line but
4:02:19
after each row let me print only a new line so there's a lot going on here
4:02:25
especially if you've never touched python let alone Loops but notice what I've done here too and I'll add some
4:02:32
comments for clarity for each row in
4:02:37
square for each uh brick in row
4:02:44
print brick and here is where comments and more generally pseudo code can
4:02:49
really help explain to yourself and others what your lines of code are doing on line eight I'm iterating from I
4:02:56
equals 0 on up to side so 012 on line 11 I'm doing the exact same
4:03:02
thing but using J from 012 but that's good because I represents now each of my
4:03:07
rows and while I'm on each of those rows inside of this outer loop I'm going to do brick brick brick 1 two 3 1 2 3 1 2 3
4:03:16
but I don't want my cursor to keep moving to the next line while I'm on a row so I'm just overriding that line
4:03:23
ending but let me ask a question of the group now why on line 16 do I have a
4:03:29
print here all by itself why do I have a print all by
4:03:36
itself notice that it's below the inner loop but inside of the Outer Loop so to
4:03:44
speak what is that loop on line 16 doing ultimately every time you finish a line
4:03:52
you have to add a new line and at the end of it so print it prints a new line
4:04:00
perfect I don't want a new line after every brick I only want to do that at the end of the row and that's why my
4:04:06
comments now are perhaps enlightening notice that this Loop here is just
4:04:12
iterating for each brick in in the row once I'm done with that inner loop so to
4:04:17
speak once I'm done with these highlighted lines here to Evelyn's point I need to print out one blank new line
4:04:23
and we've not done this before but when you call print with no arguments all you get is that automatic line ending the
4:04:29
back slash end where the cursor moves to the next line so if I now roll go back
4:04:34
to my terminal window and run mario. I think I should get a 3X3 square and it
4:04:40
doesn't quite look like a square on my screen because these hashes are a little taller they are wide but it is in fact
4:04:46
3x3 but let me propose as we've always done here how we might tighten up this code further just for clarity sake let
4:04:53
me get rid of my comments for a moment just so we can see how many lines of code we have total and let me propose
4:05:00
that we maybe do this let me propose that you know what this inner loop especially if you're having trouble
4:05:06
wrapping your mind around one Loop inside of another loop you don't strictly need it what if we do this
4:05:11
trick again what if we print out out inside of the outer and only Loop each
4:05:17
of those hashes times the number of times we want them right we draw inspiration from an earlier approach and
4:05:23
we run python now of Mario same result but now print square is really nice and
4:05:29
compact it has one explicit Loop and it's still printing out using string multiplication all of the hashes at once
4:05:37
on that row if you like abstraction and you'd like to wrap your mind more around
4:05:42
what the code is doing well let's do this if you're not quite clear on what's going on let's propose that you
4:05:48
implement a function called print row passing in size and let me propose that this print row function it simply take
4:05:55
in that width and print out the individual hash times that many times in
4:06:02
other words here's an opportunity for abstraction whereby well what does it mean to print a row well when you're
4:06:09
implementing print Square I don't really care what it means to print a row I just need to know that someone's taking care
4:06:15
of printing the row you can kind of pass the buck to another function Al together and how does print row work well it
4:06:21
could use a for Loop it could use this string multiplication trick this is a way to take a larger program and this is
4:06:28
probably the most complicated one we've looked at thus far and to decompose it into these smaller components that once
4:06:36
assembled achieve your final idea seeing no questions that's the end of our look
4:06:42
at Loops in Python this ability to do things cyclically again and again and when we combine those with conditionals
4:06:48
this ability to ask and answer questions and combine them with our functions and variables we really now have most of the
4:06:53
building blocks we need to solve much larger much more interesting much more personal questions so in the weeks to
4:06:59
come we'll start to see exactly what could go wrong though when we do so but we'll introduce you to all the more
4:07:05
tools via which you can troubleshoot those same problems