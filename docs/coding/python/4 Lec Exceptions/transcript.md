
4:07:34
all right this is cs50's Introduction to programming with python my name is David
4:07:39
men and this is our week on exceptions exceptions in python as well as in other programming languages refer to problems
4:07:46
in your code indeed when something is exceptional in your program it actually doesn't mean it's a good thing it means
4:07:52
something has gone wrong that ideally you will somehow solve so what are some of the things that can go wrong so I'm
4:07:57
going to go ahead and open up VSS code on my computer here and in the terminal window I'm going to go ahead and run
4:08:02
code of hello.py that's going to of course open up a brand new tab for me hello.py in which I can write my code
4:08:09
and let me go ahead and write some very simple code just to say hello to the world let's go ah head and say print
4:08:14
quote hello comma world and then let me go ahead and I'm forgetting to close
4:08:21
that quote so a mistake that you yourself might have already made or might surely in the future make and it's a little subtle because you might not
4:08:28
necessarily notice that you've just missed that one character well let me go ahead and somewhat optimistically go
4:08:33
down to my terminal window now and run python of hello.py and hit enter and that's the first of my errors my gosh
4:08:40
I've only written one line of code and I seem to have more lines of error errors on the screen but the Salient point is
4:08:45
this bottommost thing here notice where it says syntax error a syntax error is a problem with the code that you have
4:08:51
typed your syntax just like English and other human languages have syntax associated with them so does my code and
4:08:57
it's not quite correct something is ay I didn't follow the instructions properly and it does elaborate for me
4:09:04
unterminated string literal now that's a bit Arcane that is a bit of a confusing error message but unterminated would
4:09:10
generally mean that I started something but didn't stop it I didn't terminate it string of course is a sequence of text
4:09:17
like we've discussed before or stir in Python and literal generally refers to something that you literally typed it's
4:09:23
not a variable it's something like quote unquote or just quote hello world so the
4:09:28
fix here of course is going to be to go ahead and terminate that string and actually close the quote and if I now go
4:09:35
back down into my terminal window and rerun python of hello.py now I'm saying
4:09:40
hello to the world so the catch withd syntax errors here is that syntax errors are entirely on you to solve a syntax
4:09:48
error is a problem that you've got to go back into your code and fix from the Geto you can't just kind of hope that
4:09:53
it's going to resolve itself or expect that other parts of your code will catch it for you syntax errors just must be
4:10:00
fixed but there's a lot of other types of errors in Python that might be described as runtime errors that happen
4:10:06
while your code is running and it's really up to you to write some additional code defensively to detect
4:10:12
when those errors happen because you don't necessarily know for instance what input humans are going to type into your
4:10:18
program and so you better be ready defensively to accommodate things that they type or even mistype so for
4:10:24
instance let's go back over here to vs code and let me propose that we take a look at a a new file Al together I'm
4:10:30
going to close hello.py and I'm going to write code of say number. piy so let's
4:10:36
play around with some numbers in Python and the first thing I'm going to go ahead here and do with number. py after
4:10:42
opening the this new tab is I think I'm going to go ahead and print uh type up a relatively simple program that maybe
4:10:48
prompts the user for an integer like X and then just prints out what x is so we're going to start super simple but
4:10:54
again in starting simple we'll be able to really see where I've done something wrong well here we go I'm going to go
4:10:59
ahead and say a variable called X is going to get assigned the value of the
4:11:05
return value of input quote unquote what's X question mark and I'm going to include a space to move the cursor over
4:11:11
a little bit and then ultimately I'm going to go ahead and oh wait a minute if I'm wanting to get an INT from the
4:11:17
user recall that I need to do something proactively I need to actually convert that input to an integer using the int
4:11:25
function in Python so now I'm passing the return value of input as the argument to in and that will store in X
4:11:31
ultimately an integer not a string that looks like an integer all right let me go ahead now and just quite simply print
4:11:37
out what this is I'm going to go ahead and print out uh quote unquote X is X
4:11:42
but I don't want to literally say x is X I want to plug in the value of x so maybe the easiest way to do that is to
4:11:48
surround it with curly braces and then if I'm using these curly braces and I want python to interpolate the value of
4:11:55
that variable that is substitute what x actually is in between those curly braces recall that I need to use a
4:12:00
format string or an F string by prefixing this whole thing with an F now that I've done that let's go ahead and
4:12:06
see what happens I'm going to go ahead in my terminal window and run python of number. Pi I hit enter and so far so
4:12:13
good all is well and being prompted for X let me go ahead and type in a number like 50 all right that seems to work
4:12:19
program seems to be correct or is it what could go wrong in this program
4:12:27
even though nothing did just go wrong but if I run it and run it and run it again during the running of my program
4:12:34
what could still go wrong especially if I'm not the human interacting with it but some other Human Instead any
4:12:41
volunteers here for this one what could go wrong and in what way is
4:12:46
this program not really correct even though at first glance it seems so what
4:12:53
what is an inter we code in in a integrated
4:13:00
ID we can't code in a interpreter so I'm not calling an integer I'm still having
4:13:05
trouble hearing you but what I think I heard is that if the what the user types in is not in fact an integer I can't
4:13:10
just blindly convert it to an int if I'm not putting too many words into your mouth I think what I should perhaps do
4:13:17
here is be a little defensive and let me see if I can't simulate exactly the
4:13:23
problem that could go wrong here let me go ahead and run again python of number. piy let me try another number and in
4:13:29
fact when testing your code generally it's a good idea to test Corner cases maybe numbers that aren't quite as plain
4:13:35
as 50 or 49 or 51 let's choose some numbers that might be a little more interesting if only mathematically like
4:13:41
zero all right Z seems to work my code still prints out that X is Zer what might be another Corner case to consider
4:13:47
well let me go ahead and try a negative number that too is pretty different in spirit from 50 negative 1 okay that
4:13:54
works too well let me try it one more time I've tried positive numbers negative numbers zero let me try
4:13:59
something like a cat so literally C A typing in a string that doesn't even
4:14:04
look like a number and yet let's see now what happens when I hit enter all right we'll see now we've got another kind of
4:14:11
error it's not a syntax error because I didn't make a typographical mistake I didn't forget some piece of syntax I
4:14:18
actually now have a error with one of my values and it's a value I didn't even anticipate the human me in this case
4:14:24
typed it in long after I wrote the code so what does this refer to a value error
4:14:29
well let's see what the explanation is invalid literal for INT with base 10 quote unquote cat now this to is a bit
4:14:36
of a mouthful and unfortunately in python and a lot of programming languages the error messages are written
4:14:41
for pretty comfortable program and of course when you're learning programming for the first time you might not be so
4:14:46
comfortable with the programming language let alone the error messages but let's see if we can't glean some
4:14:51
insight so invalid literal well again a literal is just something that's been typed in it would seem for INT what is
4:14:59
int exactly well int is the function I'm using to convert the user's input to a
4:15:04
corresponding integer base 10 that refers to the decimal system uh which is this the default that Python's using and
4:15:10
it looks like at the end of the day what python really doesn't like is that I passed Cat quote unquote to the int
4:15:16
function so how do I go about actually fixing this problem well I could just
4:15:22
add instructions in my program maybe I could add a line of print telling the user more explicitly be sure to type an
4:15:28
integer or please don't type cap please don't type strings of course the user might still not oblig they might not be
4:15:34
reading the instructions so that too is probably not an effective strategy what we really want to do is write our code
4:15:39
with error handling in mind we want to write lines of code that not only accomplish the problems we care about
4:15:44
but that also handle errors that might unexpectedly happen and in general when
4:15:50
programming programming defensively assume that the users aren't going to be paying attention or Worse they're
4:15:55
malicious they're trying to crash your program so we want to handle as many errors as we can now how do we go about
4:16:01
doing that in Python well it turns out whether you want to catch a value error or other types of errors as well though
4:16:08
not syntax error python actually has this keyword called try and it's sort of aptly named if you want to try to do
4:16:14
something in Python you can literally use this keyword and you can check whether or not something exceptional
4:16:21
something erroneous has happened so using both try and this other keyword except can I go and try to do something
4:16:28
except if something goes wrong I can do something else instead so let's consider how can I go about trying to convert the
4:16:36
user's input to an INT except if something goes wrong well let me go back to my code here and let me propose that
4:16:42
I now modify this example as follows let me go ahead and above my first line of code I literally write try and a colon
4:16:49
telling python try to do the following I'm going to go ahead and indent my existing lines of codes here by the same
4:16:55
number of spaces four in this case and then I'm going to add one more new line down here that literally says accept
4:17:02
value error and notice it's important that I've capitalized the V and I've capitalized the E these uh symbols are
4:17:08
case sensitive and this is now an opportunity after this colon to tell python what I want to do in exceptional
4:17:16
cases when the number or the input from the user is not in fact a number and I'm
4:17:21
going to say something plain like print quote unquote X is not an integer I'm at least going to tell the user roughly
4:17:28
what the problem actually is so notice another detail the indentation is important because I have try on line one
4:17:34
and I've indented lines two and three those are the two lines of code that I'm trying except if I see a value error
4:17:41
line five because it's indented is what is going to get executed in cases of those errors let me go ahead now back to
4:17:47
my terminal window and run python of hello of python of number. piy enter and
4:17:54
let's go ahead and type in 50 again still seems to work and of course I'm trying and succeeding let me go ahead
4:18:00
and try once more this time though with the word cat or really anything that's not a decimal number and now you'll see
4:18:07
much more cleanly X is not an integer I'm not seeing some scary error message that I of a user am have going to have
4:18:13
no idea how to handle now you the programmer have anticipated that something exceptional can happen and
4:18:18
you've gone about actually handling the error for the user giving them an appropriate error message instead let me
4:18:25
pause here and see are there any questions now on what we've just done by introducing try and accept to handle
4:18:33
this value error is value error the only type of error you can get or the other
4:18:39
types is value error the only thing you can catch there are other errors as well and we'll a few of them today and
4:18:44
there's many many more honestly that if you continue programming and programming in Python you're going to see a lot of them over the the weeks the months the
4:18:50
years to come but the technique for handling them is going to be largely the same other questions on try accept or
4:18:57
these exceptions more generally uh yes sir actually to use the accept log you
4:19:03
need to know the type of error right like here you knew it was a value error what what if you can't anticipate this
4:19:09
particular type of the error a really good question so I'm being very good about catching so to speak the very
4:19:17
error that I know might happen I don't know when it might happen because it's going to depend on the user but I know what kind of error will happen from the
4:19:24
int function there is a way in Python where you can say except if anything goes wrong and you can literally omit
4:19:31
value error and just catch everything the problem with that is that it sometimes hides other bugs in your code
4:19:37
because you don't necessarily know what's going wrong and if you don't necessarily know what's going wrong how can you possibly handle it correctly so
4:19:44
bad practice and it put another way it's lazy to do that to just say catch everything and I'll deal with it here so
4:19:50
a much better practice would be to figure out what kind of Errors could happen and include mention of them
4:19:56
explicitly as I've done now with that said if you read Python's official documentation as you'll eventually
4:20:02
invariably do it is not great about telling you proactively what kinds of
4:20:07
Errors can be raised in this way so it's a bit of contradictory advice you should
4:20:13
do it this way but it's not always obvious what you should be checking for but you get better at it with practice
4:20:19
and some of the times the documentation does spell out what could go wrong let me turn our attention now back to this
4:20:24
and point out that even though this is better code it is more correct in the sense that I'm not just leaving it to
4:20:31
the user to see some really ugly default python error message that most people are going to have no idea what to do
4:20:36
with I'm at least handling it more elegantly and I'm printing out X is not an integer so it's at least more
4:20:42
instructive but this isn't necessarily the best way to implement this code why well here too
4:20:47
I'm actually still being a little lazy so notice that I'm trying to do not one line of code but two lines of code and
4:20:54
this isn't a huge deal because we're only talking about two lines of code but in the interest of PR uh preaching best
4:21:00
practices you should really only be trying to do the one or very few lines
4:21:06
of code that can actually raise an exception that can actually fail in some way I am pretty sure that calling print
4:21:14
here is not going to raise a value error whether X is an INT or a string or a float or anything else the format string
4:21:21
feature of python is going to handle printing it just fine so really what I'm going to do is this I'm going to move
4:21:28
this line three down to the bottom of my code I no longer need to indent it I'm just going to execute it at the bottom
4:21:34
of my file here unfortunately by doing this I've done a good thing by now only
4:21:40
trying to do the minimal amount of work necessary that might raise the exception a value error but I fear I've introduced
4:21:48
a new mistake well let's see what is now in correct let me go ahead and again run python of number. enter let me go ahead
4:21:55
and do it correctly with 50 and all seems to be well but again let's try those Corner cases the zeros the
4:22:00
negative numbers or in this case the cat let me go ahead and type in C A again enter now I have a name error so now
4:22:07
it's yet another type of error in my code that I've introduced here and what is this name error mean well just as a
4:22:13
value error refers to that the value of some variable the value that someone has typed in is incorrect name error tends
4:22:20
to refer to your code like you're doing something with the name of a variable that you shouldn't and why might that be
4:22:27
well let me turn our attention back to the code here and consider what is it complaining about well the name error is
4:22:33
what I see down here and it's telling me name quote unquote X is not defined and
4:22:39
notice if I look further here it is mentioning line six so I know the problem is with my code on line six and
4:22:46
that worked a moment ago and I'm defining X on line two but let me ask
4:22:52
the group here why does X not in fact exist on line six why is it not defined
4:23:00
even though I'm pretty sure I was intending to Define it on line two maybe the scope of the variable is between the
4:23:09
tri block so good terminology scope refers to the portion of code in which a
4:23:15
variable exists that to though isn't quite right in Python that would be true in cc++ in Java where indentation or
4:23:21
curly braces tend to define the scope of a variable but again here in general and
4:23:26
this worked a moment ago X exists once it's defined on line two because remember I printed out X is 50 a little
4:23:34
bit ago let's try one more hypothesis here one more hand why is X somehow
4:23:41
still not defined um yeah so is it because it's loo variable meaning that like it doesn't
4:23:47
Define outside of scope CU like what people have mentioned it's it as it
4:23:52
promps it input in try right but outside of it it's undefined so still good
4:23:57
instincts in good terminology too there's this notion of local variables which tend to exist inside of functions
4:24:03
for instance Global variables which tend to exist in entire files in this case too though that's not quite the case
4:24:09
What's Happening Here boils down to order of operations let me come back to the code here and recall that anytime
4:24:15
we've discussed the assignment operator the single equal sign that copies a value from the right to the left but
4:24:21
consider for a moment at what point something is going wrong well the input function is probably working just fine
4:24:27
because we've used that a lot now to get users input it always returns a string or a stir in Python but what could be
4:24:34
going wrong well if I'm passing that string to the int function as its
4:24:41
argument it's probably the int function that's airing and indeed if you think back earlier when we had the value error
4:24:47
it was in fact the int function that did not like quote unquote cat as input so this is all to say that this portion of
4:24:54
my code highlighted now to the right of the equal sign that's the code that's creating a problem that's the code that
4:25:01
was creating a value error and in this case we're catching the value error but
4:25:07
because the value error is happening on the right of the equal sign there's no value being copied to the left the error
4:25:14
is interrupting that whole process so even though we see x equals dot dot dot
4:25:19
on line two the portion of that line to the left of the equal sign isn't getting evaluated ultimately because the value
4:25:26
error is happening too soon and so when we finally get down to line six even
4:25:31
though it looked like I was defining on line two and I would have defined X on line two if all had gone well we didn't
4:25:36
get to the part where the value is copied from right to left because the value error happened first so this code
4:25:42
is just incorrect now so how do I go about solving something like this well it turns out that there's another
4:25:49
feature of the try and accept syntax that python supports which is that it also supports the keyword Els now we've
4:25:56
seen Els before if you think back to our discussion of conditionals we saw if we saw L if we saw Els which was kind of
4:26:04
this catch all what you should do in the event that nothing else is relevant that's kind of the same intuition here
4:26:10
for the TR accept feature of py what you can do is this you can try to
4:26:15
do the following as I've done except if this goes wrong but if nothing goes wrong else go ahead and do this so this
4:26:23
is one way I can solve this same problem now no matter what now python is going
4:26:29
to try to execute line two if something goes wrong it's going to execute lines three and four to handle that value
4:26:35
error however if you try and this code succeeds then there is no exception to
4:26:42
to handle so you're then going to execute this line here so it's a little confusing perhaps in that we're now
4:26:47
using Els both for conditionals if L if L if L if Els and we're also using Els
4:26:54
with these Tri accept blocks but that's okay that's part of the language that's one of the features so now if I rerun
4:27:00
this code in my terminal window python of number. piy let's do something correct like 50 I see that X is 50 so
4:27:08
line one is executed we're trying to do the following line two is executed because the conversion happened
4:27:14
successfully and the number 50 gets copied from right to left the exception does not happen so we ignore lines three
4:27:21
and four we jump immediately to line five and six which prints out the result
4:27:26
by contrast though let's do this one last time python of number. piy let's type in cat or again any other word and
4:27:32
hit enter now we don't see what x is rather we see quote unquote X is not an
4:27:38
integer which is what's being handled in my except Clause all right let me pause
4:27:44
here because that's a lot of new syntax and see here if there's any questions on try on accept on else name error or
4:27:51
value error can you please repeat try function repeat the name error what's
4:27:57
the problem with the name error yes yes yeah so let's let's just rewind a couple of lines here before I fix this problem
4:28:04
by now getting rid of the Els a moment ago we had code that looked like this
4:28:09
whereby I was getting a name error python of number. piy enter typing in cat that looked like this where name X
4:28:16
is not defined and the problem was on line six according to this output in Python well let's think about this now
4:28:23
deductively let's try a different approach on line six I'm seeing an error that name X is not defined okay Python's
4:28:29
already telling me X does not exist at that point so how could that possibly be well where should X be defined well
4:28:36
presumably X is defined on line two up here so what could go wrong well if the
4:28:42
user has inputed something that doesn't look like a number like the word cat passing cat the return value of input as
4:28:50
the argument to int to convert the word to an INT makes no sense you can't
4:28:56
convert a cat C A to an integer at all so the int function is raising a value
4:29:03
error at that point and the error is being handled with this code here but
4:29:09
notice this line six is not indented it's left aligned with the rest of my code which means no matter what line six
4:29:17
is going to execute it's going to execute whether I typed in 50 or I typed in cat but if I typed in cat again X
4:29:24
never gets a value so it's not defined here on line six so when I introduced
4:29:29
finally the Els statement that makes sure that these things are mutually exclusive I only execute the Els if I
4:29:36
tried and succeeded up above well let me propose that we we refine this just a
4:29:43
little bit further as well and consider how we might improve this example a little bit more it's a little it's a
4:29:51
little unfriendly of me to be rejecting the user's input after they fail to
4:29:56
provide an integer and just quitting the program really right it'd be more userfriendly if I just prompt or
4:30:02
reprompt the user again and again and in the chat if you could what's the feature
4:30:07
of python that you can use if you want to do something again and again and again until such time as the user
4:30:13
cooperates and gives you what you're looking for like a number so yeah loop loop loop so a loop is something that
4:30:20
happens again and again and again and maybe we can use that same mechanism a loop in order to prompt the user for x
4:30:27
and if they don't give us a number prompt them again and if they don't prompt them again and again and again we don't need to just quit out of the
4:30:33
program so quickly so let me propose this let me propose here that I improve this code by deliberately doing this let
4:30:40
me induce a infinite loop at the very top of my code with while true recall that the while
4:30:47
keyword induces a loop a cycle that behaves like this and it asks a question a Boolean expression that needs to
4:30:53
evaluate either to true or false well if I want this thing to Loop Forever at least initially we'll just say while
4:30:59
true because true is true so this has the effect of doing something no matter what forever unless we break out of it
4:31:06
early now I'm going to go ahead and do this I'm going to go ahead and move my
4:31:11
triac C code indented underneath this Loop so that I'm trying to get an X if I
4:31:17
have a value error instead I print that X is not an integer but this time what
4:31:22
do I want to do if the user does try and succeed in giving me a number well I can
4:31:29
do this I can just break out of my code here and down here now I can use that
4:31:34
same line of code from before an F string that says X is and then in curly braces X again so what's going on here I
4:31:43
think this codee now because I've added the loop is going to have the effect of trying at least once maybe a second time
4:31:50
maybe a third time maybe 500 times until the user finally gives me what I want
4:31:55
which is an integer and once they do once there's no value error happening then I break out of the loop and line
4:32:02
nine executes as I would hope so let me go ahead and try executing this version python of number. piy enter what's X let
4:32:10
me go ahead and type in the easy thing first 50 x is 50 what just happened in terms of the control flow of this
4:32:17
program the flow of my logic well I first found myself on line one inside of a loop hopefully I'll get out of this
4:32:22
Loop what did I then do on lines two and three I tried to get input from the user
4:32:28
and convert it to an INT well I was a nice guy this time and I typed in 50 which looks like and is a number so the
4:32:33
int function converted it just fine and stored it from right to left in X except
4:32:38
value error there is no value error because if I typed in a number there's there's nothing exceptional happening this is a boring good execution of my
4:32:46
program so what happens I break out of the loop so again the else Clause is
4:32:51
associated with the try not with the accept and once I'm out of the loop of course I'm just printing out what x is
4:32:58
well let's try the other scenario that might happen python of number. piy enter what's X let's try cat or any other word
4:33:06
enter ah this is now a new feature I'm being informed what I did wrong X is not
4:33:12
an integer so I'm getting some useful user feedback but notice again I'm prompted what's X well let me try typing
4:33:18
in dog X is not an integer what's X let me try bird enter X is not an integer
4:33:25
what's X and suffice it to say this will happen now forever if I'm in an infinite Loop until I try and succeed at which
4:33:32
point I break out so let's try again 50 enter now I'm out of the loop and I'm printing out what x actually is all
4:33:40
right let me pause here and see if there are any questions the logic is almost the same but what is different now is
4:33:46
I'm in a loop and I'm using the keyword break in Python to deliberately break
4:33:52
out of the loop when I'm ready to once the user has cooperated do we really
4:33:57
need to break can't we just print or what what keeps us from just printing uh
4:34:04
good question so let me try that couldn't I just print well let's see what happens if I do that let me move this print line at the end in into my
4:34:12
Loop here thereby shortening the program and in general that's been a good thing python of number. piy enter let me go
4:34:18
ahead and type in 50 okay X is 50 what's x uh okay maybe it's 49 x is 49 uh okay
4:34:26
maybe 48 unfortunately I think you're you're laughing you see it I never break out of the loop which maybe that's a
4:34:31
feature maybe you want this to be your program but I didn't I'd eventually like this game to stop so I need to break out
4:34:37
in that way but I can do it a little differently and let me propose that we modify this a little bit but first any
4:34:43
other questions on this syntax here let me rewind to the prior
4:34:50
version he uh can I use break uh all in exception except in else for example in
4:34:57
another uh print and when you use print in the else you can use print together
4:35:03
with break or something like this yeah you so you can use break inside of Loops to break out of loops and you can use it
4:35:10
inside of a conditional like an if an L if or an else you can do it inside of a try accept else statement too anytime
4:35:17
you're in a loop that you want to break out of you can use this keyword break I'm using it in the context of
4:35:22
exceptions but it's not restricted to that and let me show you too it doesn't even have to be in the Els if I wanted
4:35:28
to I could actually do this I could get rid of my elt and I could go back to
4:35:33
line three add another line that's indented line four and break out here
4:35:39
now why is this logically okay well well consider what I'm now trying to do I'm
4:35:45
trying to execute line three and converting the user's input to an INT and I'm trying to store the result from
4:35:51
right to left in X if something goes wrong the code we've already seen is immediately going to jump to line five
4:35:58
and then six to handle the exception but if nothing goes wrong my code presumably
4:36:04
should just keep on executing line by line so I could technically logically put the break here and watch what
4:36:10
happens when I run this version python of number. Pi 50 enter it worked I broke
4:36:16
out of the loop now which way is better honestly I think it could go either way at this point this program is so
4:36:23
relatively short that even though I'm trying to do two things now one of which the break is not going to fail like you
4:36:29
either break or you don't there's no piece of data from the user that's going to influence that we don't strictly need
4:36:35
to have those two lines of code there but it's only two lines so I think it's okay and if you recall our discussion in the past not just of correctness does
4:36:42
the code work as it should but design I think you could argue it either way if you prefer the readability of this and
4:36:48
the fact that you don't have an El that's fine if though you prefer to minimize just how many lines of code
4:36:54
you're trying to execute in case something goes wrong the else is a reasonable approach too well allow me to
4:37:00
propose too now that we refine this further I think we're at the point where it's pretty darn correct but suppose now
4:37:07
that I find myself today and tomorrow trying to get numbers from the user quite a bit it would be nice as we've
4:37:13
seen to maybe just invent my own function get int to get an integer from the user both today and tomorrow and
4:37:19
Beyond and heck maybe I can even share that function with other people if they want to write programs that get integers
4:37:24
from users so how might I go about doing this well let me go ahead and propose that we do this let me get rid of the
4:37:30
print line but keep most of my Loop here let me Define a function called get int
4:37:35
that takes no arguments for now and I'm going to go ahead and indent all of the code I already wrote underneath get in
4:37:41
so now I have a function called get int that tries to do the following try to
4:37:48
get an in from the user if something goes wrong and there's a value error yell at them with X is not an integer
4:37:53
else break but it's not just breaking that I want to do here now that I'm in a
4:37:58
function recall our discussion of return values if you're inventing your own function whose purpose in life isn't
4:38:05
just a print something on the screen like a side effect but is to hand back a value to hand you back value like on
4:38:12
that same Post-It note from our discussion of functions well you need to return X explicitly how do I now use
4:38:18
this function well as soon as we start making our own functions it tends to be convenient to Define our own main function as well that's the main part of
4:38:25
our program and I'm going to keep this simple I'm now going to say x equals get int and then on the next line I'm going
4:38:31
to do that print from before quote unquote X is in curly braces X and at
4:38:36
the very bottom of my program recall I'm going to call Main so that no matter what I'm invoking my main function after
4:38:43
everything's been defined well let's see how this works let me go ahead and run python of number. Pi enter let's type in
4:38:51
50 and it seems to work as before let's go ahead and run it again typing in cat C A this time X is not an integer and
4:38:58
I'm being prompted dog and I'm being prompted bird and I'm being prompted fine fine fine 50 that's an INT and so
4:39:06
it is printed so what's worth noting here well I'm manifesting a couple of good properties here one
4:39:11
I've kind of abstracted away this notion of an getting an integer and even though I just artificially hit enter a whole
4:39:18
bunch of times just to hide that function for now it needs to be there but we don't need to see it at this point notice that now this entire
4:39:24
program really boils down to just these three lines of code now why because I've abstracted away that whole process of
4:39:30
getting an INT from the user into this new function of my own called get int but can I improve upon this well let me
4:39:37
go ahead and undo all of those blank lines and pull this up just so we can see more on the screen at once can I
4:39:42
tighten up my implementation of get int it is correct I claim this is correct it's handling errors and it's returning
4:39:49
X but I don't strictly speaking need to write the code as long what else could I
4:39:54
do well let me propose that if all you're doing on this line 13 is breaking and then immediately after that per the
4:40:00
indentation you're executing return X on line 14 why are you wasting everyone's
4:40:06
time once you know you're ready to return the value you could just return X and so in my else I could break out and
4:40:13
return a value so here too return is used to return values from functions
4:40:18
break is used to break out of Loops but it turns out that return is sort of
4:40:24
stronger than break it will not only break you out of a loop it will also return a value for you so it's doing two
4:40:31
things for once if you will but can I make this even more compacts if if if my
4:40:39
goal is to just tighten the code up even though it's already correct can anyone think of a further refinement whether
4:40:45
you've programmed in Python before or not can I shorten this implementation further just a little bit if only to
4:40:52
decrease the probability that I've made a mistake by having fewer lines and just make it a little easier to read because
4:40:57
it's shorter any suggestions for tightening up my implementation of get int you can just return the value on the
4:41:04
try function when you're trying uh at you take you take the input X and then
4:41:11
done X good we can just return x a little higher up and let me correct folks as we go it's not a tri function
4:41:18
it would be a tri statement technically a function typically has a parenthesis and another one in this case it's just a
4:41:23
statement so but we can do exactly that I don't technically need the else if I really want I could do this right after
4:41:29
line nine I could return X here or recall our discussion of defining
4:41:35
variables unnecessarily sometimes like why Define a variable here if you're immediately going to use it here and then never again so we could avoid a new
4:41:43
line here and I could avoid even defining X explicitly I could just say
4:41:48
something like this I could return int input quote unquote what's X I can do it
4:41:53
all at once now which is better I don't know I mean again this is where
4:41:58
reasonable people might disagree I'd argue that on the one hand we're tightening up the code we're using fewer
4:42:04
lines it's easier to read lower probability that I've made a mistake on the other hand it's a little more
4:42:09
complicated to understand perhaps it's a little less obvious where I'm returning from so I think arguments can be made
4:42:15
either way at the end of the day what's important is that you've done this consciously you've made a decision to do
4:42:20
it this way or this way and you can justify it in your mind not that your answer is uh it worked so I left it
4:42:26
alone like have a good reason come up with a good reason and that will come with experience and practice well let me
4:42:32
propose too that we make one other refinement here suppose that you're finding your programs to be a little
4:42:38
noisy and it's a little obnoxious that you keep telling the user X is not an integer X is not an integer X is not an
4:42:43
integer what if you want to make things a little gentler and just prompt the user again with the same words what's x
4:42:51
what is X what's X again and again well you can do that as well and it turns out that if you want to handle an exception
4:42:58
in Python but you want to pass on doing anything with it so you want to catch it
4:43:04
but you essentially want to ignore it you don't want to print anything you don't want to quit the program you just
4:43:10
want to silent ently ignore it like if you're talking in a gr full of people and you're it's your turn to talk and
4:43:15
you're just like pass they're still calling on you but you're not doing or saying anything more well we can add
4:43:21
this keyword to our code here let me go back to my program here and instead of printing out again and again X is not an
4:43:28
integer I could just do this I could pass on handling the error further I'm
4:43:33
still catching it so the user is not going to see a scary message even mentioning value error my code is
4:43:38
catching it but I'm passing on saying anything about it I'm going to stay in the loop I'm going to stay in the loop
4:43:44
and keep prompting and repr prompting the user so now the effect looks a little something like this python of number. piy let's type in cat what's X
4:43:52
again let's type in dog what's X again type in bird so it's just a little maybe more user friendly and that you're just
4:43:59
reminding the user what you want maybe it's worse maybe it would be helpful to tell the user why you're prompting them
4:44:05
again and again it's not obvious so it could go both ways but again it's just another mechanism now for handling these
4:44:11
errors we use the accept keyword to catch a specific error but we don't have to handle it more than that we can just
4:44:18
pass on doing something further let me pause here and see if there's any questions now on try accept else or
4:44:27
pass okay yeah know I was just kind of curious I guess about uh the idea of
4:44:32
when you were indenting with uh the get in function for example um because I'm
4:44:37
noticing you know obviously going through it with the whole logic and breakdown the entire uh the entire function you know while true do this but
4:44:44
I'm just kind of curious on elaborating with the indentations for the uh code more yeah so the indentation is
4:44:50
deliberate logically some languages don't require as rigorous indentation you can use curly braces or other
4:44:57
symbology to make clear what is associated with what in general anytime you indent something in Python on this
4:45:03
line so rather anytime you write a code a line of code in Python that's here and the lines below it are somehow indented
4:45:11
that means that those lines are somehow associated with that first line and presumably those indented lines should
4:45:17
only be executed if the first line told the uh uh told the computer to do so so
4:45:23
concretely what does this mean on line six here we're defining a function called get int that takes no arguments
4:45:30
colon everything that's indented by at least four spaces Hereafter is part of
4:45:35
that function why that's just the design of the Python language frankly I think the designers got tired of seeing really
4:45:41
ugly code in languages like C and C++ and Java uh that uh don't necessarily
4:45:47
enforce uh indentation to this extent so now it's baked into the language and my
4:45:52
chronology might be a little off there but there's been many languages that are looser than python when it comes to
4:45:58
indentation the indentation is Meaningful on line 72 notice that because the while true is indented by
4:46:04
four spaces that just means it's part of the get in function but notice below the while true statement there's eight
4:46:10
there's 12 there's eight there's 12 spaces here and I'm just quickly counting the dots that means that all of
4:46:16
the lines I've just highlighted are inside of that while loop while true means to execute lines 8 through 11
4:46:22
potentially again and again and again and now lastly on line eight because we
4:46:28
have try and indented below it is line nine that just means that what you should try is what's on line nine and
4:46:35
similarly on line 10 below it we have indented line 11 you should only pass
4:46:40
when there is an exception of a value error so the indentation just means what
4:46:45
is associated with what and once you get comfortable with that you'll see that it helps the indentation alone helps
4:46:51
explain the logic of your program and it has a wonderful side effect that for yourself the next morning for your
4:46:58
colleagues your family your friends your teachers your code is much more readable as a result it's not one big mess of a
4:47:04
blob of text other questions now on try except else or pass yeah thanks um two
4:47:12
question uh question one um uh once you say pass can the caller still um learn
4:47:19
anything about this error um through a system variable or whatever and question
4:47:25
two problem set zero referenced some string Methods including is numeric is
4:47:31
it any different to um go via isomeric here good question
4:47:38
so on the first question if I'm handling the error in this way the caller is not going to know anything about it that's
4:47:43
the point of my handling it so that Maine or other callers don't know that anything technically went wrong on the
4:47:49
second question is numeric is another function that you can call that can look at a string and determine is this in
4:47:55
fact a number I could use a mechanism like that I could use a conditional if
4:48:00
this looks like a number then pass it to the int function and go ahead and convert it to an integer that's totally
4:48:06
fine I would generally say that the pythonic way of doing things is often
4:48:12
For Better or For Worse to try things hope they work but if they don't handle
4:48:17
the exception so other languages are more in favor of checking if if if if L
4:48:23
if else and all of these conditionals python tends to be a little more of the mindset eh try it but just make sure
4:48:30
you're handling the error so this would be the pythonic way of doing it your way though checking with a conditional is it
4:48:35
a number first is totally reasonable too if you want to go that way well let me propose some final refinements to this
4:48:42
program that really just kind of tighten things up one additional step to improve
4:48:47
the implementation of this get in function let me propose that we not hardc code so to speak that is type
4:48:53
manually X all over the place let's make this function get int a little more reusable right now notice that I'm just
4:49:01
kind of using the honor System that well main is defining a variable called X and
4:49:06
get int is asking for a variable called X but it would be nice if the caller
4:49:12
main doesn't have to know what the call is naming its variables and vice versa so caller to call a function means to
4:49:19
use it the caller is the function that's using it the call E is just the function being called it would be nice if I'm not
4:49:25
just hoping that X is the same in both places so let me propose this let me
4:49:30
propose that we actually add a parameter to get int like this what's X that is to
4:49:38
say if main wants to use the in function well then main should probably tell the get in function what prompt to show the
4:49:45
user just like the input function recall that comes with python it's up to you to pass in a prompt that the user then sees
4:49:53
when the human is asked for input so how do I make this work here I can go down to my definition of get int and I can
4:49:59
say all right get int is going to take a parameter now called prompt I could call it anything I want but prompt in English
4:50:06
is pretty self-explanatory it means what do you want the message the user will see and now down here when I actually
4:50:11
use input I don't have to presumptuously say what's X because what if the program
4:50:17
the caller wants to ask for y or Z or some other variable I can just pass to
4:50:22
input whatever prompt the caller has provided so now I'm making more reusable
4:50:27
code it still works just the same I haven't changed the functionality per se but now it's a little more dynamic
4:50:33
because now get int doesn't have to know or care what variable is being asked for what's being asked for it just needs to
4:50:40
know what prompt it should show to the user so if I now run this program down here again prompt number. piy enter
4:50:47
what's x 50 still seems to work let's run it again let's type in cat it still seems to work and if I type in cat dog
4:50:54
bird or anything else it will keep prompting me with that same prompt making this code therefore all the more
4:51:01
usable now it turns out too you can even raise exceptions yourself using Python's raise keyword but more on that another
4:51:08
time so in the coming days the coming weeks the coming months as you write more code in Python you'll see that
4:51:14
errors are inevitable sometimes there's syntax errors which you got to just fix if you even want to run your program at
4:51:19
all but they could be name errors for instance variables that you meant to Define but somehow didn't value errors
4:51:25
where maybe the user didn't cooperate and provided you with something that you weren't expecting or a whole list of
4:51:31
other possible errors or exceptions but now hopefully you know how you can handle these errors and respond to them
4:51:37
in any way you like this then was our look at except and we'll see you next