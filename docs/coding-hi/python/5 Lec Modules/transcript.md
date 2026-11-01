
4:52:08
time all right this is cs50's Introduction to programming with python
4:52:13
my name is David Meen and this is our week on libraries so libraries are generally files of code that other
4:52:20
people have written that you can use in your own programs or a libraries code that you've written that you can use in
4:52:26
your own program but maybe not just this program but another and another as well so python supports exactly this idea
4:52:32
this ability to share code with others share code across your own projects and it does so by way of what it calls
4:52:39
module a module in python is just a library that typically has one or more
4:52:44
functions or other features built into it generally the purpose of a library or a module specifically is to encourage
4:52:50
reusability of code if you find yourself using the same types of functions again and again the same functionality if you
4:52:57
find yourself copying and pasting from an old project into your new project odds are there's an opportunity there to
4:53:04
factor out that code that you keep copying and pasting that you keep reusing and put it into a library that
4:53:10
you can then load into your programs moving forward so as to not just copy and paste it and have all these
4:53:16
different copies all over so what are some of the modules or libraries that python comes with well python comes with
4:53:22
a random Library literally which is to say that when you install the python interpreter on your Mac or PC or
4:53:28
somewhere in the cloud not only do you get python you get a whole bunch of modules as well now these modules
4:53:34
provide you with functions that you don't have access to just by default like you do print and input print and
4:53:40
input and other such functions just work in Python but sometimes functions are tucked away in these modules so you have
4:53:47
to be more deliberate about loading them into the computer's memory so somewhere on the computer's hard drive once you've
4:53:53
installed python there is also it turns out a file probably called random. py
4:53:59
that someone else wrote probably long ago but that you have access to and in that random. piy file there's probably
4:54:05
one or more functions that you yourself can use in order to do things randomly
4:54:10
that is to say how could you flip a coin in a program in Python how could you pick a a random number between 1 and 10
4:54:17
in Python well you need a bit of Randomness and while you could figure out mathematically how to write
4:54:23
functions like that yourself it's a lot easier to stand on the shoulders of others who've already solved that
4:54:28
problem for you so you can focus on the problem that you yourself want to solve so for documentation on most any python
4:54:36
module you go to the official python docs and you go to a URL like this where the documentation for that specific
4:54:41
module lives and within the documentation you'll see a list of the functions or other functionality that
4:54:47
some module provides but how do you go about loading a module into your own
4:54:52
program so that you can use the functions in that module well we need a new keyword in Python and namely it's
4:54:58
import the import keyword in Python allows you to import the contents of the
4:55:05
functions from some module in Python well how might I go about using using
4:55:10
this in practice well let me propose that there exists in that random module this function among others so I have
4:55:17
copied and pasted from the documentation uh this uh summary of a function called
4:55:22
choice now the function exists in the random module so to speak not a random
4:55:28
module the random module and so generally the documentation describes it fully like this random. choice is how
4:55:36
you would technically call this function though we'll see alternatives to that in parenthesis there is a parameter called
4:55:42
seq for sequence and sequence generally means a list or something that is list
4:55:47
like if you have a list of numbers or strings or anything else and the documentation elaborates well how can I
4:55:52
go about using this function to solve perhaps a a familiar problem well let me go ahead and open up vs code here and
4:55:58
let me propose that we Implement a program that simulates flipping a coin a coin that in the US heads heads or tails
4:56:06
the idea of which is to pick a decision with 50/50 probability 50% probability
4:56:12
of heads 50% probability of Tails or you can use some other mechanism like that well let me go ahead and open a program
4:56:18
with code called generate. piy because I want to start generating a whole bunch of random information the first of which
4:56:25
is just going to be a coin toss now how do I go about using that function well I first have to import the random Library
4:56:32
so literally the first or among the first lines of my file should be import random and that just gives me access to
4:56:38
all of the functions in that specific specific module now suppose I want to flip a coin well I can do random. Choice
4:56:46
per the documentation a moment ago and that again takes a sequence what's a sequence it's a list or something that's
4:56:52
list like and we know about lists we've used lists to iterate over numbers we've used list to iterate over students at
4:56:58
Hogwarts let's go ahead now and list iterate over just a list of two sides of a coin heads quote unquote or tails now
4:57:06
I could call these anything I want these are my strings I just want to simulate tossing a coin so I'm just going to say
4:57:11
in all lower case heads and tails but notice the syntax I have heads and tails in double quotes that's because they're
4:57:17
strings I could also use single quotes so long as I'm consistent there's a comma between them which means the list
4:57:23
has two elements there's square brackets to the right and the left which indicates that this is indeed a list
4:57:29
that's the syntax recall for defining a list in Python and then lastly there's something more familiar there's the
4:57:35
parentheses outside of those square brackets but those are just the parentheses that belong to the choice
4:57:40
function and specify where its parameter gets passed in but again unlike ped
4:57:45
functions I have to specify what module this function is in at least for now and
4:57:51
so I do random. choice to call this specific function all right well it's one thing to flip a coin picking between
4:57:57
those with 50% probability and that's what random. choice does it takes in a list and it returns to one of those
4:58:04
values randomly with equal probability because I've passed in two items I've got a 50/50 chance if I passed in three
4:58:10
items it'd be a 33% chance for each of those items and so forth python does the math for you but I want to store the
4:58:17
value of this in a variable so let's Define a variable called coin equals whatever the return value is so this is
4:58:23
indeed like flipping a coin I'm going to store in a variable called coin whatever that value is heads or tails and now
4:58:29
just so I can see what's going on let's go ahead and print out the value of that string coin all right let me go ahead
4:58:35
now and run this program in my terminal window python of generate. P enter and
4:58:41
it looks like the first coin toss was the heads let's go ahead and run it again and it looks like it was heads
4:58:47
again maybe you want to chime into the chat here if I run it a third time what's it going to be this time if you want to type your thoughts in the
4:58:54
chat you might think there's a bug here but this is probability in action if I
4:58:59
go ahead and hit enter a third time there it's actually now tails and again tails and again tails and again tails
4:59:06
and again tails and again heads now if we did this in infinite number of times it would indeed work out to be 50/50 if
4:59:13
we only do it a few times it might not work out as cleanly but that's how probabilities indeed work all right so
4:59:19
I've got that now working could I have implemented this in a different way well let me show you an alternative to
4:59:24
actually using the import keyword alone and let me introduce the keyword from in
4:59:30
Python so from is a keyword in Python that you can use when importing functions from a module but it allows
4:59:37
you to be a little more specific than import Al Lo so if I go back to my code here it's worth noting that what
4:59:43
technically I'm doing here by importing random is I'm technically importing everything that's in that module so not
4:59:50
just the function called random. choice but a few other functions as well so instead of using this line of code at
4:59:57
the top of my file import random which will technically give me access to all of the contents there in a downside of
5:00:03
that is that I have to type in random. choice random. this random. that because
5:00:08
all of the functions I'm calling have to be associated with the scope of that module well suppose that I just want to
5:00:14
call the function as its name choice I can do that as well let me replace this first line here with from random import
5:00:22
choice and what this does effectively is it loads the functions name Choice into
5:00:27
my current name space into the scope of the file I'm working in what that means
5:00:33
is that I now know longer have to specify Which choice function I mean I can just say choice and so it loads it
5:00:40
into the local namespace that is into my local vocabulary if you will so I can just now say choice this might be
5:00:47
advantageous in what cases do you think when might you want to import the name
5:00:53
of the function explicitly like this as opposed to just saying random. choice random. choice throughout your code when
5:01:00
calling a function any instincts here for this alternative import using from
5:01:07
um hello I'm Mohammed from Egypt and maybe if we have a variable that its
5:01:12
name is basically like choice if I have a variable called the choice so I need to differentiate Which choice I choose
5:01:19
so I'm gonna choose random DOTA Choice yeah really good instincts by using the first approach by just importing random
5:01:26
you're making sure that all of its contents are associated with are scoped to the random module so that you can
5:01:33
have your own choice function you can have your own choice variable you can use the same names as all of the
5:01:38
functions or variables that are stored inside of that file without them colliding so to speak and this is a good
5:01:44
thing in older languages it was the case that if you imported someone's Library you better hope that you're not using
5:01:50
the same functions or variables as they are because you might in fact have some kind of conflict Python and certain
5:01:56
other languages allow you to scope the names of those functions and variables to the file or the module that they come
5:02:01
from so that's a good thing but honestly this is such a short program or equivalently maybe I'm using the choice
5:02:08
function in so many places calling random. choice random. choice random. choice it's just making my code longer
5:02:15
and longer and longer marginally so but it just getting ugly and annoying I can
5:02:20
simply import choice and now tighten up my code a little bit so as with so many decisions in the past there's not
5:02:26
necessarily one right approach or another it depends but I think for those very reasons sometimes it's better to do
5:02:31
what we did the first time which is only import the module so as to retain the scope therein well let me propose that
5:02:39
we transition to to another function that comes with Python's random module and that's this here from the
5:02:44
documentation Rand int it's a bit hard to say but it implies get back a random int and if you read the documentation
5:02:50
it's a random int that's between A and B inclusive so if you were to pass in one
5:02:56
for a and 10 for B you would get back a number between one and 10 inclusive including the one and including the 10
5:03:03
potentially each with a 10% probability so how might I go about using a program like this well let me come back to my
5:03:09
generate. piy file and why don't we go ahead and try generating a random number between 1 and 10 you might do this
5:03:15
frequently in the real world when you just want someone to pick a random number you tell them as much and the human responds let's get the computer to
5:03:21
do the same here let me go ahead and delete my two lines of code at the bottom but keep my import random and
5:03:26
let's go ahead and Define a variable this time called number set it equal to the return value of random. randint and
5:03:33
now pass in a a value of one and B a value of 10 and now let's go ahead and
5:03:39
print the number I'm going to go ahead in my terminal window and run python of generate. Pi and hit enter
5:03:46
four python of generate. Pi and hit enter eight again nine again s again 10
5:03:55
again two again and we can do this all day long and if we add all of those up they should end up being with 10%
5:04:01
probability each now how might you use this information well maybe we're playing a guessing game or maybe we're
5:04:07
trying to randomize the behavior of some character in the game you can imagine using very simple building blocks like
5:04:13
this just kind of spicing up your program by getting it to do things a little less predictably because you're
5:04:19
choosing these values seemingly randomly and you're deferring to python to actually do the generation of these
5:04:25
numbers uh using its own algorithms and its own math well what more could we do here let me propose that we introduce
5:04:31
another function that comes from this random Library yet another that you yourself have don't have to implement
5:04:36
Shuffle if you read the documentation for Shuffle in the same random module you'll see that it takes in a list for
5:04:42
instance of values and just shuffles them up it randomizes them like a a deck of cards here you might shuffle them so
5:04:49
it's to put them into seemingly random order well how do I use this based on this function's name well let me propose
5:04:55
that we go back to vs code here and let me go ahead and this time do the following because I need to shuffle
5:05:01
something like a deck of cards let me go ahead and not just import random but let me give myself a variable called cards
5:05:07
that's going to be of type list and just so I have something to shuffle I don't need all 52 cards in a typical deck I'm
5:05:13
just going to shuffle three cards a jack a queen and a king I could call those strings anything I want but I just
5:05:19
wanted a list of some values so as to shuffle them up that is randomize the order therein well how does this now
5:05:25
work if you read the documentation for random. Shuffle you'll see that it shuffles the argument in place that is
5:05:33
unlike many of the functions we've seen it doesn't return to a value that contains the shuffled cards in this case
5:05:39
it actually shuffles the list it's given itself so what this means for my code is that I need to do something like this
5:05:46
random. Shuffle and pass in the variable containing those cards and then on a
5:05:52
final line here how might I go about printing the cards well I could do this and I could say print cards but if I do
5:06:00
that I'm actually going to see python Syntax for lists and it's just going to format in its own way using commas and
5:06:06
the like I want to print these cards out one at a time just because I think it'll look a a little better so we can use some of our syntax from loops and say
5:06:12
something like this for card in cards go ahead and print out the current card so
5:06:19
what's now Happening Here line three I'm defining a list of three cards in this order Jack queen king I'm then shuffling
5:06:27
those same cards on line four and then on line five I'm using a for Loop for each of the cards in that list print it
5:06:34
out one at a time and because I'm using print one line at a time well let's see
5:06:39
the results down here in my terminal window I'm going to run python of generate. and hit enter queen king Jack
5:06:46
seemingly shuffled cuz that's not the order I defined earlier let's do it again queen king Jack H okay that
5:06:53
happens to be the same but let's see this could just be bad chance there we go Jack queen king doesn't look like
5:07:00
it's shuffled but at least we're getting back different orderings now again jack queen king hm not so good Jack queen
5:07:08
king not so good this is someone you you probably want to play against with cards Queen Jack King there we go but of
5:07:13
course we only have three cards here so there's not that many permutations we might see and if we do this over time we
5:07:19
will see all of them but if we had of course 13 or 52 cards we'd see a lot more permutations instead so we have now
5:07:26
these three ways to Generate random information one is simple coin toss if you want to start some kind of athletic
5:07:32
event one pick a number between one and 10 if you want to decide something based on that and now using Shuffle we can
5:07:37
even take in a list of things and shuffle them about so that we get some kind of random Behavior let me pause
5:07:44
here and see if there's any questions yet on random on modules or any of these
5:07:50
three functions yeah uh can we increase or decrease the
5:07:55
probability uh of costs if you want to for example there
5:08:00
is three there is a 33% chance of probability so is there any chance to increase or decrease the probability can
5:08:08
you set these probabilities not using these same functions uh can you set the probabilities but you can absolutely
5:08:14
Implement some of your own functions or use more sophisticated functions that do exist in this library and others to
5:08:20
exercise more control these are meant to be very userfriendly and simple functions certainly the ones we looked at that give you equal probability for
5:08:27
all of those but absolutely you could skew things though hopefully if you're implementing a gambling game or the like
5:08:32
you're not actually making some cards more probable than others allow me to turn back now to our implementation here
5:08:39
of this Randomness and consider how we might leverage other types of functionality that aren't necessarily in
5:08:44
this specific Library here well it turns out that python also comes with a statistics library and this contains all
5:08:51
sorts of functions for doing things more statistical in nature namely calculating means or medians or modes or other uh
5:08:58
aspects of a data set that you might want to analyze so how might we use the statistics module on python well we
5:09:04
might first just take a look at its documentation like any other module on Python and we'll see Within that library
5:09:09
that there's a whole bunch of functions and one of those functions is one that's quite simple it's average a function
5:09:15
that allows you to calculate the average of some numbers that you've passed in let me go ahead and nvs code in my
5:09:21
terminal window open up a new file called average. piy and at the top of this file I'm going to import a
5:09:27
different Library this time namely the statistics module in Python and now I'm going to go ahead and call a function
5:09:33
that I know comes in that module namely mean for the average of some values and I'm going to call Stat statistics. mean
5:09:41
and I'm going to pass into this function mean a list of some values and let's suppose that I'm quickly trying to
5:09:47
calculate what my current grade average is in school and I did really well on my first test and I got 100% And on my
5:09:53
second I did well but not as well and I got a 90 and ironically I'm not very good with math so I'd like to figure out
5:09:59
what my average now is between those two tests so let me go ahead now and in this list type in the number 100 comma 90
5:10:06
thereby passing in a list of two values to ins one 190 and in outside of those
5:10:11
are the parentheses because of course this is now the argument I'm passing to the function called mean and this
5:10:17
function mean is in the module called statistics well it's not that interesting to just calculate the mean
5:10:23
if I don't actually see what it is so let me additionally pass the return value of that mean function to the print
5:10:29
function as usual let me now in my terminal window and vs code Type in Python of average. piy and hit enter and
5:10:35
voila as you might expect my average is 95% so the difference here is that I'm just using a different module that still
5:10:42
comes with python but I need to import it instead of for instance the random module instead and this time I know from
5:10:48
the documentation that there exists a function called mean well it turns out there's even more functionality that
5:10:54
comes with python and that comes with other modules in Python and there's this feature generally known as commandline
5:11:01
arguments this is a feature not just of python but of languages more generally that allow you to provide input not when
5:11:07
prompted inside of a program as happens whenever we call the python function
5:11:13
input but rather there's this feature command line arguments of programs that allows you to provide arguments that is
5:11:19
input to the program just when you're executing it at the command line so up until now for instance Rec call that
5:11:25
we've generally run python of something. py for instance python of hello.py and
5:11:30
I've never once really executed any words or phrases after the name of the file but I could in fact when you're
5:11:39
running programs in a command-like environment like we are you can provide any number of words or numbers or
5:11:45
phrases after the command that you're typing and all of those will somehow be passed in as inputs to the program
5:11:52
itself you don't have to prompt the user for one thing at a time by manually
5:11:57
calling that input function so what does this mean in real terms well let me go ahead back into VSS code here and let me
5:12:04
propose that we consider how we might leverage a certain module I'm going to
5:12:09
go ahead and create a file called uh name. pi and I'd like to use a new module this time that's going to give me
5:12:16
access to values that have been typed at that command line but what's this module
5:12:21
going to be well this one's going to be called CIS and CIS short for system contains a whole lot of functionality
5:12:27
that's specific to the system itself and the commands that you and I are typing the documentation for this module is at
5:12:33
this URL here and it lists all of the various functions and variables and the like that come with that module but
5:12:40
we're going to focus on something a little more specific namely this thing here it turns out in the CIS module in
5:12:46
Python there is a variable that just magically exists for you called argv it
5:12:52
stands for argument Vector which is a fancy way of describing the list of all of the words that the human typed in at
5:12:59
their prompt before they hit enter all of those are seemingly magically
5:13:04
provided to you via python in a variable called cis.org V this variable is a list
5:13:11
which means that the first element is going to be the first word that you typed the second element is going to be the second word that you typed and so
5:13:16
forth and by way of this list then can you figure out what words did the human actually type at the prompt and maybe
5:13:23
use that to influence the behavior of your own program so what does this mean now in real terms well in this new tab
5:13:29
called name. piy let me go ahead and import CIS within that CIS module is
5:13:34
going to give me access to cy. RV but how might I want to use it well let's do this instead of writing a hello world
5:13:41
program that all of these times has just looked for the return value of input to
5:13:47
figure out what the user wants me to print let's go ahead and just expect the user to tell us when they run the Python
5:13:53
program itself what their name is and suppose this time I'd like to generate a whole bunch of name tags initially just
5:13:59
one and in the US here it's very common to wear a sticker on your lapel that says hello my name is David so I want to
5:14:05
print out some text that resembles that the idea being maybe I could enhance this program someday to even send that
5:14:10
text straight to the printer and dynamically generate those name tags well let me go ahead now and do this let
5:14:15
me go ahead and print out as always hello but I'll say a little something more this time to make things more interesting hello my name is quote
5:14:23
unquote and then after that I normally have been in the habit of calling input
5:14:28
storing the return value in a variable and passing in the name of that variable here but I'm going to instead jump right
5:14:35
to this sis. RV bracket1 and that's it
5:14:40
I'm going to have a program here that says hello my name is followed by whatever is in sis. arv bracket one and
5:14:48
notice sis. argv again is a list and recall from our discussion of loops and in turn lists we use this square bracket
5:14:54
notation to get at the various elements inside of a list all right let me go down now into my terminal window and run
5:15:01
python of name. py but this time rather than just hit enter and wait for the program to prompt me for my name let me
5:15:07
proactively just tell this prr program what my name is at the so-called command line here we go David separated with a
5:15:14
space from the name of the file so that now when I execute python name. py David
5:15:19
I see on the screen voila hello my name is David So based on this demonstration
5:15:25
alone I think we can infer exactly what's going on in cy. RGV even though it sounds certainly at first glance uh
5:15:32
rather complicated here let's look up at cy. Arvy I'm going to bracket one here
5:15:38
so clearly cy. RV bracket one is storing
5:15:44
David but it's one in the past when we looked at Loops recall that we said that
5:15:49
they were zero indexed that is the first element is zero the next element is one
5:15:54
the next element is two and so forth and yet here I am treating it as though my name is at the start of the list one
5:16:01
well let me ask this question what is probably insist. arv of zero what is
5:16:09
probably insist. Arvy of zero the very first element actually in that list oh
5:16:16
yeah uh I think uh it's like in C uh the name of program indeed it's indeed like
5:16:24
in C and other language is the name of the program well if we consider what it was I typed I certainly typed python
5:16:31
because that's the name of my interpreter and we don't really need to know that because we're using python itself but after that I did type two
5:16:37
things I typed name. as I've done so many times anytime I want python to interpret a program I've written and it
5:16:43
turns out by convention what python does is it stores in cy. arv the name of the
5:16:48
file that you're executing or interpreting followed by any number of
5:16:53
other words that you type so all this time we could have been accessing the name of the program which frankly isn't
5:16:59
all that interesting but we can also now access words that are typed after that prompt as well but of course if I don't
5:17:07
type anything in what might happen here this might be naive of me to assume that there's
5:17:12
always going to be something at location one in cy. RV let me go ahead and try this python name. pi and no I'm not
5:17:20
giving you my name because at this point I might not even know that you want my name to be typed so let me hit enter now
5:17:26
and uhoh we see now an error a so-called exception in Python this one's a new one
5:17:31
this one's an index error that elaborates list index out of range and
5:17:36
turns out this is actually one of the most common mistakes in programming whether using a list in python or arrays
5:17:42
or vectors in other languages is to try to access some element that does not exist you try to go too far to the left
5:17:49
or you try to go too far to the right in this uh in this object that is just a
5:17:54
list of some values so of course the mistake here is that I'm assuming there's going to be something at
5:17:59
location one when really it's location zero that's the only one that has a value but fixing this is not going to
5:18:06
amount to doing bracket zero because now if I go ahead and rerun this program with no other words after name. it says
5:18:14
hello my name is name. which is fine if we're making a name tag for the program but that's not of course what my goal
5:18:20
here is instead so if the fix is not just to change the one to a zero how
5:18:25
else might I handle this error how else might I handle this error
5:18:31
this index error that happens if the user just doesn't remember to or doesn't know to type their actual name at the
5:18:37
prompt we could always put an exception into the program saying if there is um
5:18:45
if there's nothing at location one we just come out the say okay we haven't got a parameter or something but if
5:18:52
there is we continue along with the program perfect so if I might simplify we can try to execute this line of code
5:18:59
except if there's an error we'll deal with it in some other way now ideally and once I'm a strong enough programmer
5:19:04
I would have anticipated this and written the following code from the get go but when you're learning it's certainly reasonable to see an error oh
5:19:11
I didn't realize I should detect that and then go back and improve your code but of course if you read the documentation you ingrain some of the
5:19:17
Lessons Learned From the Past you'll get into the habit of trying and checking for some of these exceptions yourself so
5:19:23
let me solve this in one possible way as you proposed here let's try to handle this exception as follows let me go
5:19:29
ahead now and instead of just blindly calling this print line let me try to print out hello my name is such and such
5:19:37
except if there is an issue specifically an index error then what do I want to go ahead and do I'm going to
5:19:43
say something like two few arguments I could be more explanatory than that but for now I'm just going to explain to the
5:19:50
user that they gave me too few arguments too few words at the prompt so now it's still not going to work in quite the way
5:19:57
I want I'm still not going to be able to generate their name tag but at least they're not going to see some cryptic error message and think that they
5:20:03
themselves broke the program let me go ahead now and run python of.pi enter and too few ARG ments okay let me go ahead
5:20:10
now and do python of name. and type in my name David and now we're back in business and I see that my name is on
5:20:17
the screen too but strictly speaking I don't have to try to do this I could
5:20:23
actually be a little more defensive in writing this code and maybe I could check whether or not the user has indeed
5:20:29
provided a name or multiple names at the prompt so as to give them more refined
5:20:35
error messages as well so how might I do this well let me go and and undo the exception handling I've added and why
5:20:41
don't I instead more modestly try to do this let me go ahead and introduce a conditional here if the length of cy.
5:20:49
argv is less than two or equivalently equal to just one value but I'll just
5:20:56
stick with less than two for now then go ahead and print out two few arguments so
5:21:02
I want ultimately two arguments I want the name of the program at location zero and I want the name of the human at
5:21:08
location one so that's a total of two arguments so if I have fewer than two arguments let's tell the user with this
5:21:14
print line L if the length of cy. RGV is say greater than two like they typed in
5:21:20
too many words at the prompt well let's tell them print quote unquote too many arguments else if they did get it right
5:21:28
and they gave me exactly two arguments else let's go ahead and print what I actually care about all right let me go
5:21:34
down to my terminal window here and run python of name. and voila uh oh a completely different type of error this
5:21:40
one a syntax error which we've seen in the past now a syntax error recall is May aopa like I messed up here and I
5:21:47
wrote invalid syntax and so no amount of conditionals or exception handling is
5:21:52
really going to catch this one I need to go back and just get my program to work because it's not running at all well let me go up here and see line four is the
5:22:00
issue and indeed it looks like I have an unterminated string here I need to go
5:22:05
ahead and now add this double quote so let me go ahead now when with that red herring gone let me rerun python of
5:22:11
name. piy and hit enter and now we see too few arguments okay maybe it wants my full name let me go ahead now and run
5:22:18
python of name. py David maen typing in both words after the name of the file
5:22:23
and hit enter and now of course it's too many arguments fine now I'll oblige and do python of name. py and just David and
5:22:30
there we have it my name tag printed on the screen so strictly speaking we don't have to handle exceptions if we can be a
5:22:36
little smarter about it and just check for the things that we're worried about especially if we want to give the user
5:22:42
more refined advice we don't want to just tell them no something went wrong or we don't want to pass we want to tell
5:22:47
them no that's too few or no that's too many we have conditionals in our vocabulary already via which we can now
5:22:55
Express that well let me pause here and see if there's any questions now on how we handled the error before with the
5:23:01
index error or how now we're just proactively avoiding all index errors Al
5:23:06
together by just checking first first is it too few is it tooo many or is it exactly what we want hi thank you um so
5:23:14
I was wondering you you touched upon kind of using your full name um could we
5:23:19
could we then um is there a way going forwards that perhaps we uh have people
5:23:26
that want their full names and want their just their first name that we separate that into like oh this person
5:23:32
has full name this person has just the one name absolutely and allow me to is uh
5:23:39
allow me to propose we come back to that support for multiple names um but indeed we could do that and I should note too
5:23:45
though we can support full names right now if I do this instead of typing in David space mailin which is problematic
5:23:53
because again by definition of how argv Works each word ends up in a specific
5:23:58
location in the list but if I add quotes single quotes or double quotes at the command line now python will view this
5:24:05
as two total things the name of the file and this full name name and now when I hit enter I don't see the quotes the
5:24:11
whole thing is passed in as my full name and if I want to adapt this further for multiple people we'll be able to do that
5:24:17
as well other questions now on this version with if L if else or on accept
5:24:22
before hi I want to I want to ask you uh can we use multiple else statements can
5:24:29
you use multiple El's statements no else is the last catchall statement that you can have you can have multiple L if
5:24:36
statements in the middle but not multiple elses all right all right well let's
5:24:44
turn our attention back now to this code and see if we can't refine it a bit more by adding in some additional functionality that we get with modules
5:24:50
like the CIS module one of the things I don't love about this version of the code even though arguably it is now
5:24:56
correct is that the essence of my program which is just to print out the name tag is kind of relegated to this
5:25:03
else clause and that's fine logically it's correct but generally speaking
5:25:09
there's something nice about keeping all of your error handling separate from the
5:25:14
code that you really care about having all of these ifs L ifs perhaps at the top of your code that are checking to
5:25:20
make sure that all of the data is as expected but then it would be nice if only for design sake not to sort of hide
5:25:27
in this El statement the actual code that you care about I would prefer for instance to do something logically like
5:25:33
this I could check for errors up top and then down here print the name tags it
5:25:40
would be nice if those are sort of distinct blocks of code all of which are here left aligned but there's a problem
5:25:45
with what I've just done here logically what bug did I just introduce by getting
5:25:51
rid of the Els and introducing line 10 on its own with no indentation outside
5:25:58
of the conditional what bug have I just introduced what mistake to be
5:26:04
clear um name error ironically it's a name error but not a name error
5:26:10
exception it's an error with my name but I think you're Frozen for me it's
5:26:15
going to raise an exception because even though I'm checking the length of cis.org V up top and even though I'm
5:26:22
checking it again for being greater than two not just less than two but greater I'm still then blindly and incorrectly
5:26:28
assuming it's now going to exist so just to be clear if I run python of name. and
5:26:33
I don't type any arguments I've got too few I think I'm going to see that I have have too few but I'm also going to see
5:26:41
that same exception at the very top of my terminal Windows output there's my error message to few arguments but again
5:26:46
on line 10 I blindly proceed to still index into my list at location one which
5:26:52
does not exist so it turns out there's a better way to handle errors like this especially if you're writing a program
5:26:58
in Python that's just meant to run briefly and then exit anyway but maybe
5:27:03
we could start to exit prematurely if the program itself just can't proceed if
5:27:08
the user has not given us the data we want perhaps we should just exit the program earlier than we might otherwise
5:27:15
so let me go ahead and do this let me go ahead and remove my comments so as to focus only on the code here and let me
5:27:21
propose that instead of just printing quote unquote twoo few arguments I'm
5:27:26
going to use one other function that comes with the CIS module I'm going to go ahead and call cy. exit and as the
5:27:33
name suggests it's going to do exactly that with the system's help it's going to exit my program then and there on
5:27:40
line 4 why is that okay well if you gave me too few arguments I have nothing more to say to you the user I might as well
5:27:47
exit a bit prematurely and I can do this as well on line six let's go ahead and not just print that but sis. exit quote
5:27:53
unquote too many arguments print out that message and just exit right there now I can trust that by the time I get
5:28:00
to line eight every error condition has been checked for and so it's safe for me
5:28:05
to assume that there is in fact and a item at location one in cy. argv so let
5:28:12
me go ahead now and run this python of name. py enter too few arguments but I'm
5:28:18
back at my prompt nothing more has happened let me run it again python of.pie David maen with no quotes enter
5:28:26
too many arguments is now printed here finally python of name. py just David
5:28:31
enter hello my name is David so we have then insist two forms of functionality
5:28:37
now we have access to this variable sis. arv this argument Vector that gives me all of the words that were typed at the
5:28:43
prompt including the program's own file name and it turns out if we read further in the documentation there's an exit
5:28:49
function that can take different types of inputs but if I pass it a string like this it will indeed print that string
5:28:55
for me and then exit from my program then and there questions now on exiting
5:29:01
from programs like this to be clear all of this time once python gets to the
5:29:06
bottom of your file it's going exit anyway so I'm using cy. exit now just to make sure that I exit earlier than
5:29:13
otherwise um my question is about the cis.org arv so is that capable of accepting or
5:29:22
taking multiple elements at once let's say for example uh python name thatp
5:29:29
David Malon I'm a male uh 20 years old and if let's say I only want to access
5:29:36
your name which is at the first index and then your your your age is pro say
5:29:43
at the sixth index can I say sis. RV one
5:29:48
and another one for six to access what I just want is that possible for CIS RB uh
5:29:56
short answer yes I think if I understand your question correctly whereby you're proposing to have many words at the end
5:30:02
of the command and you want to access those individual words absolutely at some point it gets a little fragile I
5:30:08
would say if you're typing so many words at the prompt that the order really matters and so it turns out there's a
5:30:15
lot of programs and there's functionality in Python that can allow you to provide those values like name or
5:30:21
age or any number of other fields in any order you want but pass in a bit more
5:30:27
information textually that tells the program how you want to use it so in short what you're describing is possible
5:30:33
and let me do a small incarnation of it as follows let me propose that we go
5:30:38
back to my code here and let's propose that we actually now want to support multiple values at the prompt so there's
5:30:44
going to be no such thing as too many arguments suppose that I want to generate name tags not just for David
5:30:50
but for David for Carter for Rong Shin for others in the group who all want their name tags as well so I'm going to
5:30:56
go ahead and do this I'm going to get rid of my L if condition because I don't want to limit the maximum number of words that are typed at the prompt
5:31:02
anymore I instead want to iterate over every name at the prompt so I'm going to
5:31:09
say this for Argin sis. argv go ahead and print out this time ARG so what am I
5:31:18
doing here well even though the syntax is a little different the idea is the same as before when we've had Loops I'm
5:31:24
using a for Loop to iterate over a list the list in question here is cy. argv
5:31:30
ARG is a variable that I'm creating on the Fly the for Loop is going to make sure that the first time through this
5:31:36
Loop AR is set to the first word on the command line the second time through the loop Python's going to make sure that
5:31:41
ARG is now set to the second thing on the command line and so forth that's just how a for Loop works it updates the variable for us I don't have to call it
5:31:48
ARG I could call it name so long as I change it to name in both places but ARG is reasonable if I'm iterating over
5:31:54
arguments more generally if I now run this program though unfortunately there's a little bit of a bug even if I
5:32:02
type in David and Carter and wrong Shin I'm not going to get just just three
5:32:08
name tags in your mind does anyone see the bug I'm about to trip over it's not a
5:32:15
huge deal if I've got enough name tags to go around but I'm going to be wasting
5:32:20
one because this is going to print not three but four name tags whereby the first contains the name of the program
5:32:26
itself maybe not a big deal maybe that's the sticker we don't bother handing out but it's wasteful and it it does look
5:32:32
wrong so how could we get access to not all four elements of argv but just a a
5:32:38
slice of Arvy and this is actually a technical term in Python and some other languages to take a slice of a list
5:32:45
means to take a subset of it maybe from the beginning maybe the middle maybe the end but a slice is a subset of a data
5:32:52
structure like a list well how do I actually do this in code well in Python it's actually very easy to take a slice
5:32:59
of a list that is a subset thereof you can simply do this at the end of the list name cy. Arvy in this case you can
5:33:06
use square brackets and then in those square brackets you can specify the start and the end of the list that you
5:33:13
want to retain I want to start at element one not zero I want to start at
5:33:18
element one and I want to just go to the end so I'm actually going to Omit a second number altogether it's not
5:33:24
necessary to have a second number but I do need that colon because this is going to give me a slice of the list it's
5:33:30
going to give me a slice of the list that starts at location one not zero and the colon and then a blank just means
5:33:36
it's going to give me everything else so this is equivalently going to slice off the first element of the list and give
5:33:42
me a new list that contains just those three human names not the name of the file itself let me try running this
5:33:48
again I'm going to run python of name. py David Carter wrong Shin this time
5:33:53
hopefully I'm going to get three and only three name tags hitting enter and indeed I've done now just this so again
5:34:00
using some relatively simple syntax in Python we can use square brackets not just to go to specific elements like
5:34:06
bracket zero or or bracket one we can also get subsets of the list slices of the list by doing bracket something
5:34:13
colon Something where each of those somethings is a number the beginning or the end and they're optional depending
5:34:19
on whether you want all of them or just some any questions now on this version
5:34:25
which adds the loop and these slices with that new syntax can we slice starting from the
5:34:32
end of the argument argument Vector you can you can slice something from the end
5:34:38
of the argument vector and this might uh this might blow one's mind a little bit let me go ahead and do this uh let's see
5:34:46
let me go ahead and do negative one at the end using a negative number here and running the same command we've just
5:34:51
uninvited wrong Shin from receiving a name tag here so if you use a negative number it has the effect of counting to
5:34:58
the uh in the other direction from the end of the list a good question there other questions now on slices on looping
5:35:06
over cis.org V hi uh so I remember very early on uh
5:35:11
when we were talking about uh only having two decimal places in uh in an um float value um does this is is that in
5:35:20
the same vein like um because we use the the colon 2f uh so that's is that the same thing
5:35:28
then uh why would the F be included then in the point 2f as opposed to here when
5:35:35
you just have the numbers a really good question and it's just the short answer is that context
5:35:40
matters so there's only so many keyo keys on our keyboard and so we sometimes use the same symbols for different
5:35:47
things so what you're alluding to is the format code in in F string for actually
5:35:52
formatting a number using a colon using a period using a number using the letter F and so forth and that is very specific
5:35:59
to the F string feature of python this case has nothing to do with any of that syntax per se this is just using a colon
5:36:06
in a different context to solve this problem to implement a slice the authors of python could have chosen another
5:36:12
symbol but honestly looking down at my keyboard here we don't have that many to choose from that are easy to type so
5:36:18
sometimes they have different meanings a good question as well allow me to propose now that we take things further
5:36:24
and move away from using only those modules those libraries that python comes with to talk about more generally
5:36:31
packages that exist one of the reasons that python is so popular and Powerful these days is that there's a lot of
5:36:37
third-party libraries out there as well otherwise known as packages strictly
5:36:42
speaking python itself has a term of art called a package which is a module
5:36:49
essentially that's implemented in a folder not just a file but a folder but more generally a package is a
5:36:56
third-party library that you that I can install on our own Mac or PC or our
5:37:01
Cloud Server and gain access to even more functionality that other people have implemented for us now one of the
5:37:07
locations you can get all of these packages is called the pii uh website the python package index which lives at
5:37:15
this URL here and this is a website that is searchable via the command line as well as via the web that allows you to
5:37:22
download and install all sorts of packages even cs50 has some of its own packages um in services like these now
5:37:29
there's a fun one out there that's a throwback to a command that's been around for years in command line environments called cow c is a package
5:37:36
in Python that allows you to have a cow say something on your screen if curious
5:37:41
to read up on it its own documentation is on p.org specifically at this URL
5:37:47
here but how do you actually get the package into your system well technically you could figure out how to
5:37:53
download the file and maybe unzip it and put it into the right location on your Mac or PC but nowadays a lot of
5:37:59
languages python among them has what's called its own package manager this one here called pip which is just one so pip
5:38:06
is a program that generally comes with python itself nowadays that allows you to install
5:38:12
packages onto your own Macs or PCS or Cloud environment by just running a command and then voila you have access
5:38:19
to a whole new library in Python that didn't come with python itself but now
5:38:24
it's available on your system for you let's go back to vs code here and in my terminal window I'm going to go ahead
5:38:30
and type pip install cow now what's going on here pip is the command the
5:38:35
package manager and I want to install what package the package called cow I'm going to go ahead and hit enter here and
5:38:42
after a little bit of output it has successfully installed C now what does that mean that means I can now go about
5:38:48
importing this into my own code well let's go ahead and see what this means let me go ahead and create a new file
5:38:54
with code called say dopy because I want something to be said on the screen and in my new tab here I'm going to go ahead
5:39:01
and import C which presumably is now installed I'm now going to import CIS as
5:39:06
well because I'd like to use some command line arguments in this program just so that I can run it quickly and
5:39:12
without using the input function I can get the user's name immediately from The Prompt and let me go ahead and do this
5:39:18
I'm going to do a bit of error checking proactively this time and rather than use less than or greater than I'm this
5:39:23
time going to say if the length of cis.org V does uh does equal two so if
5:39:29
the human is provided just the name of the program and their own first name we're good to go I'm going to do the
5:39:35
following I'm going to call a function called cow in the package called coway
5:39:42
and I'm going to pass in a string hello comma and then as in the past I'm going
5:39:47
to pass in just one string because according to its documentation it's not like print I can't pass in comma this comma that I can only pass in one string
5:39:54
so I'm going to concatenate the contents of sis. argv bracket1 so long as then I
5:40:01
type in my name David after the name of this program it should end up in cy. arv1 one in which case this line five of
5:40:09
code should concatenate hello with my name with a space in between and apparently a cow is going to say it so
5:40:16
let's see what happens here let me go ahead and clear my screen and increase the size of my terminal window let me go
5:40:22
ahead and run python of say. py and type my name David and enter there is the
5:40:28
program called coway it literally has a cow say something on the screen and this is a throwback to a program from yester
5:40:35
year that tended to come with a lot of syst sys um this is otherwise known as asky art it's a textual way using just
5:40:42
keys on your keyboard to print pictures of sorts on the screen now we can really go down the rabbit hole here and there's
5:40:48
questionable academic value of doing so so I'll do so just once turns out the coway package comes with other functions
5:40:54
as well one of those functions for instance is T-Rex and if I now increase the size of my terminal window we'll
5:41:01
perhaps see where we're going with this let me now run again python of.pi this time let me not provide my name just to
5:41:07
see if it's broken it's still okay because we have that if condition if the
5:41:12
length of cy. RGV equals equals two and only if it equals equals 2 do we do
5:41:17
anything that's why we're not seeing anything here let me go ahead and cooperate now say. piy space David and
5:41:24
it's no longer a cow but if I zoom out on my screen a T-Rex why just because
5:41:31
these are the things you can do once you know how to program you can even package them up and make them freely available to others as open source software for us
5:41:38
it's demonstrative of a feature more generally here namely being able to install these thirdparty packages and
5:41:44
how you might do so in Python now I'll leave this up on the screen for a moment and see if there's any questions about
5:41:50
cows or Tyrannosaurus Rexes or packages more generally I'm really qualified to speak
5:41:57
to just one of those hi um I've got two questions it's
5:42:02
a bit earlier than what it's supposed to be um so the first question
5:42:07
is the the packages that you calling um U to uh use in the program are they the
5:42:17
same as um let's say because I'm doing Java um the same as calling a class of a
5:42:26
Java file in order to use its functions and my second question is
5:42:34
what's the actual purpose of using command arguments as you used because
5:42:40
it's not really the best way to uh as you say be user friendly where
5:42:48
as in let's say the person who's using the program doesn't know what it what
5:42:54
they want what the the program's asking them really good questions the first question about the comparison with Java
5:43:01
python packages are similar to Java packages where you have something do something do something at the top of
5:43:06
your program that gives you access to a class or something else python itself supports classes more on those down the
5:43:12
road and you can do very similar things in python as you can do with Java but the analog really is python packages to
5:43:20
Java packages here as for command line arguments you ask a good question why do we use them especially if they're a
5:43:26
little less user friendly they're a little less user friendly to people who aren't in this Zoom to be honest you and
5:43:33
I as we learn more and more about programming and more about command line arguments I dare say will become more comfortable with and tend to prefer the
5:43:41
ability to customize commands using these commandline arguments why productivity it tends to make you faster
5:43:47
because you get into the habit of knowing exactly how you can configure your software without having to manually answer questions and case in point all
5:43:54
of this time uh have we been running python of something. py you could
5:43:59
imagine not doing that you could imagine typing only python hitting enter and then you're prompted for the name of the
5:44:05
file you want to run so you type in something piie and then it runs not a big deal but I I would argue that over
5:44:10
time you're going to get a little tired of that tedium and you would much prefer to just automate the command again and
5:44:16
again and again especially with little conveniences like being able to hit up and down in your keyboard history so as
5:44:21
to rerun those same commands automation is Big too if you emerge from a class like this and start using python to
5:44:28
automate processes at work or for personal projects or the like the ability to specify all of your inputs on
5:44:34
the one line just means you can get work done more quickly so so hands down absolutely using commandline arguments
5:44:40
is a more Arcane uh feature of systems that most of us are no longer as familiar with because of Windows and Mac
5:44:47
OS and other operating systems that have buttons and goys and menus but the more comfortable get you get with programming
5:44:53
I dare say the more you will tend to prefer these capabilities because they allow you to do things more quickly with
5:45:00
that said allow me to propose that we take a turn toward yet another package
5:45:06
that's particularly popular and just as easy to install all toward an end of using apis now apis are not something
5:45:13
that's python specific more generally an API is an application programming interface and it can refer to python
5:45:21
files and functions but often apis really refer to third-party services
5:45:26
that you and I can write code that talk to many apis but not all live on the
5:45:31
internet these days so that so long as you have a browser or so long as you have some experience with Python
5:45:37
Programming or programming in any language you can write code that in effect pretends to be a browser connects
5:45:44
to that thirdparty API on a server and download some data that you can then incorporate into your own program now
5:45:51
how do you do this well python has a very popular package that you can install via pip called requests the
5:45:58
requests Library allows you to make web requests internet requests using python
5:46:03
code essentially as though you were a browser yourself you can automate
5:46:08
therefore the retrieval of URLs that start with HTTP or https the
5:46:14
documentation for this library is at a URL like this but it too can be installed at the command line and even though it's third party it's one of the
5:46:20
most popular and commonly used packages out there in Python and this too is one of the reasons again that python is so
5:46:27
popular there's just so many solutions to problems that you and I have or are invariably going to have when we write
5:46:33
projects of our own there's just a really vibrant EOS system a really Vibrant Community of Open Source
5:46:39
software that's that easy for us to install let me go back to my terminal window now and run pip install requests
5:46:46
in order to install this package on my own system and after some lines of output I'll see that it's successfully
5:46:51
installed now let's go ahead and create a new file here for instance itunes. it turns out that Apple has its
5:46:58
own API for their iTunes service the software that provides you with the ability to download and search for music and songs and other information as well
5:47:05
and it turns out that let me go back over to my computer here and open up a browser like Chrome and let me go ahead
5:47:11
and visit this URL here https col itunes.com
5:47:17
search question mark entity equals song Ampersand limit equals 1 Ampersand term
5:47:24
equals Weezer now I constructed this URL manually by reading the documentation for Apple's API application programming
5:47:31
interface for iTunes and what they told me is that if I want to search for information about songs in their
5:47:37
database I should specify entity equals song so that it's songs and not albums or artists or something like that if I
5:47:43
just want to get back information on one song I'm going to provide limit equals one and if the band I want to search for
5:47:49
the artist is Weezer I should specify term equals Weezer so with this if I go
5:47:54
ahead and hit enter and visit this URL I actually end up with a text file in my downloads folder on my Mac if I go ahead
5:48:01
and open that text file that my browser just downloaded we'll see all of this text here which at first glance might look a c bit cryptic but it actually
5:48:07
follows a pattern notice this curly brace at the start and notice this closed curly brace at the end notice
5:48:13
this open square bracket here and notice this closed square bracket here and in between those pieces of syntax are a
5:48:21
whole bunch of strings and values in fact a whole bunch of key value pairs what we're looking at here is a standard
5:48:27
text format known as Json JavaScript object notation which yes is technically related to yet another programming
5:48:33
language called JavaScript but Json itself is typ typically used nowadays as a language agnostic format for
5:48:41
exchanging data between computers by language agnostic I mean you don't have to use JavaScript you can use python or
5:48:47
any other language to read Json or write it as well and it's a completely text-based format which means that if I
5:48:53
visit that URL with my browser what gets downloaded is just a bunch of text but that text is formatted in a standard way
5:49:00
using curly braces and square brackets using quotes and some colons that
5:49:05
ultimately contain contains all of the information in Apple's database on Weezer song at least the first one CU I
5:49:12
limited it to one in their database and that's an API an application programming interface a mechanism whereby I can
5:49:19
access data on someone else's server and somehow integrate it into my own program
5:49:24
now of course my browser Chrome is not something I wrote I should actually write some python code that perhaps
5:49:30
pretends to be a browser to grab the same data so let's do that let me go back to vs code here and let me write a
5:49:36
program with code itunes. and we're going to write some code via which I can
5:49:41
then use the iTunes API and in turn python to get information about any band
5:49:47
that I might want I'm going to go here and import first the requests Library which I installed earlier in order to
5:49:54
make those HTTP requests I'm going to go ahead and import the CIS Library via
5:49:59
which I'll have the ability to use command line arguments like specification of the band that I want to search for if not Weezer and then down
5:50:06
here I'm going to go ahead and insert some error checking to say if the length of cy. argv does not equal to so if the
5:50:16
user does not provide me with the name of the file they want to run and the name of a band and that's it you know
5:50:22
what let's just go ahead and exit for now I could provide a more explanatory message but for now I'm going to keep
5:50:27
things simple and just exit the program prematurely so that I can trust Hereafter that cy. arv has what I want
5:50:34
and now I have the opportunity to use the requests library to write some python code that effectively is
5:50:41
pretending to be a web browser so as to connect to that same https URL on
5:50:47
Apple's own server so now that I've guaranteed that the user has typed in not just the name of the file but also
5:50:53
the name of a band at the prompt giving me a length of two for cis.org V let's go ahead and execute requests.get which
5:51:01
is a function inside of the requests package that will literally get some response from a server and the URL that
5:51:07
I want to get is the exactly the same as before https itunes.com search question mark
5:51:15
entity equals song Ampersand limit equals 1 Ampersand term equals
5:51:20
previously Weezer but let's make this program a little interactive and actually allow the human to specify at
5:51:26
the command line what artists they'd like to search for so I'm going to go ahead and close my quote early and just
5:51:33
append using the concatenation operator as in the past sis. Arvy bracket1 and now it'd actually
5:51:40
be nice to store the response from the server in a variable so I'm going to go ahead and say response equals and to
5:51:47
store all of the response that comes back from the server in a variable called response down here now I'd like
5:51:52
to just understand what the server is returning to me to make sure I know how next to proceed so this isn't going to
5:51:58
be very pretty yet but I'm going to go ahead and print out response. Json which ensures that the data I'm getting back
5:52:05
is formatted on my screen as is exactly that Json the same text format as we saw
5:52:10
on my screen it's not a useful program yet I'm really just learning along the way but let me go ahead now and increase
5:52:16
the size of my terminal window and run python of itunes. and type in the name
5:52:21
of a band like Weezer and hit enter and what we see on the screen formatted
5:52:26
almost the same as before is exactly that same text but what you'll see here is that this has been standardized now
5:52:33
as a python dictionary what indeed Apple's returning is technically adjacent response JavaScript object
5:52:40
notation but python the request library is converting it to a python dictionary
5:52:46
which happens to use wonderfully coincidentally almost the same syntax it uses curly braces to represent the
5:52:52
dictionary here and a closed curly brace to represent the end of it here for any lists therein it uses a square bracket
5:52:59
here and a closed square bracket down here it uses quotes single quotes in this case or equivalently double quotes
5:53:05
to represent the keys in that dictionary and after a colon it stores the value of
5:53:11
that key and so you'll see that indeed we have a result count key whose value is one but then a more interesting
5:53:18
result key called results whose value is this entire list of data now honestly
5:53:25
this is such a big blob of text that it's going to take me forever to wrap my mind around what I'm seeing so let me
5:53:30
propose temporarily we use another library in Python that will allow me to format my data a little little more
5:53:36
cleanly it turns out that python also comes with a special Library uh called Json that allows you to manipulate Json
5:53:44
data and even just printy print it that is format it in a way that's going to be way easier for you and I to understand
5:53:50
so let me go back to my code here let me shrink my terminal window and let me
5:53:55
propose that just temporarily again we do this let me import this additional Library Json which comes with python so
5:54:02
I don't need to install it manually with Pip and let me go ahead now and not just print out response. Json which was that
5:54:08
Big Blob of hard to understand text let me go ahead and use one other function here called json. dumps for dump string
5:54:18
and pass to that function that response. Json return value so again I'm just
5:54:23
introducing another function who I claim it has a purpose in life of pretty printing nicely formatting on the screen
5:54:30
the exact same information and I know this from the documentation having done this before but I'd like things to be
5:54:35
nicely into Ed and according to the documentation if I pass in a named parameter of indent equals 2 that's
5:54:42
going to indent everything at least two spaces I could do four or something else but it's going to be enough to help me
5:54:48
wrap my mind around what the data is I'm getting back because again I'm just learning along with you so let me
5:54:54
increase the size of my terminal window again let me run python of itunes. and again let's search for Weezer and hit
5:54:59
enter and now notice it's still a little bit cryptic because there's a lot going on here but my gosh I can totally read
5:55:07
this more easily now notice now that I still see the first curly brace which means hey this is a dictionary in Python
5:55:14
a collection of keys and values the first key is called result count it happens to be displayed in double quotes
5:55:20
now but that's just an issue of formatting it could be double or single so long as we're consistent the value of
5:55:26
that key is one why well I told the URL to only limit the responses to one Weezer song so I've gotten a result set
5:55:33
of one if I increase that limit I could probably get more then the interesting part of this
5:55:38
response is really the data itself notice in the res results key here there's a really big value the value is
5:55:46
a python list as implied by this square bracket what does
5:55:51
this list contain well I know from skimming it earlier that this contains one dictionary and that's why we see
5:55:58
another curly brace here so again if this gets a little more complicated keep
5:56:03
in mind that a dictionary is just a collection of key value Pairs and python uses curly braces to indicate as much it
5:56:11
is perfectly reasonable for a dictionary to be inside of another dictionary if
5:56:16
the value of some key itself is another dictionary so this is a common Paradigm and even though it might seem a bit
5:56:22
cryptic it's just something that allows us to associate more keys with more values now most of this information I
5:56:29
probably don't care about for instance according to Apple the unique identifier for Weezer is apparently 115,000
5:56:36
234 that might be useful if I'm making my own database and I want this to be searchable but for today's purposes all
5:56:42
I care about is the name of the track otherwise called track name as key and
5:56:48
the first song and only song because we limited it to one that we got back from iTunes here is the song that you might
5:56:54
know by Weezer called Say It Ain't So so now I have a bit of a clue if my goal
5:57:00
here is to implement a program called itunes. that doesn't just dump the response from the which is admittedly
5:57:07
very cryptic but to print out all of the songs that iTunes has for the band called Weezer maybe I can iterate over
5:57:15
this somehow so let me backtrack here's the key called track name it is inside
5:57:20
of a dictionary that is the value of results here so how can I go about
5:57:26
getting this well let me go ahead and try this let me go ahead and Shrink my terminal window back down and let me
5:57:33
propose now for one final flourish we don't just lazily print out the contents of that response because that's not
5:57:38
interesting or pretty for anyone let's do this let me go ahead and create a new variable just for the sake of discussion
5:57:45
called o for object and I'm going to go ahead and call uh o equals response.
5:57:50
Json just to store that Json response specifically in a variable called o but
5:57:56
I could name it anything I want and now I'm going to do this for each result in
5:58:03
that object's key called result go ahead and print out that results
5:58:10
track name and notice I have used exactly the same capitalization track name has a capital N results is all
5:58:17
lowercase and let me rewind before we run the actual program in line eight we are making an HTTP request using python
5:58:24
to the server just like you and I as humans type URLs into a browser and hit enter this is the python equivalent
5:58:29
there of I am then on line 10 just grabbing from that variable that contains the server's respon
5:58:36
the Json object that I care about the thing between those curly braces at the
5:58:41
very top and the bottom but because we've poked around and because I read the documentation earlier I know that
5:58:48
that object has a key called results and that results key again is a list now at
5:58:53
the moment that list contains only one song Say It Ain't So because I limited my response to one but even so my Loop
5:59:00
will work it's just going to iterate once and each time through that loop it's going to print the current results
5:59:06
track name if I want to make this even more interesting let me change this limit now from one to 50 so I'll at
5:59:12
least get back 50 track names instead let me go ahead now and increase the size of my terminal once more and go
5:59:18
ahead now and run python of itunes. searching again for a band like Weezer and here we go and voila there are 50
5:59:27
songs that iTunes has for Weezer and if we scroll back up to the top here we'll see that the very first one there is
5:59:35
indeed say it ain't so but now we got undone The Sweater Song Buddy Holly apparently another rendition of Say It
5:59:41
Ain't So perhaps from another album another Buddy Holly undone my name is Jonas and so forth questions now on this
5:59:48
program which integrates python with a real world third party
5:59:55
API yeah hi uh can we use breake instead of system. exit exit good question but
6:00:01
no um break again is used to break out of things like Loops like we saw ear clear cy. exit is used to break out of
6:00:08
the whole program itself use break for Loops for now and use cy. exit to terminate the whole program good
6:00:15
question other questions now on this program are others from where we bring the name of the key results from where
6:00:22
do we get the name of the key uh results itself yeah can we change the results name you cannot so we could in our
6:00:30
program so the keys that come back in that Json response to be clear come from itunes. apple.com some engineer some
6:00:37
team of Engineers decided for us what all of those keys would be called including track name results result
6:00:43
count and everything else you and I can absolutely store those same values in variables just like I'm doing here with
6:00:49
o just like I'm doing here with result you can rename those keys anything you want using python variables but the Json
6:00:56
response is coming from that thirdparty server other questions yes sir sir uh I
6:01:02
have a question related to to C package so like uh yes so sir what sort of ask
6:01:11
Graphics is it capable of outputting the coway package um I would refer you to
6:01:17
the URL in the slides earlier uh if only because it's more thorough they have not just cows but Tyrannosaurus Rexes and
6:01:23
several other animals as well I should emphasize that this is not a package I suspect you will use much in the real
6:01:29
world it's really just meant to be representative of the types of packages you can install but allow me to refer to
6:01:34
the documentation for what more is there but aski artart uh is the all we had
6:01:39
before there were emojis let alone gifs and jpegs and pings but it's what's is immortalized in C well allow me to
6:01:46
transition us back now to one final capability of python which is that you
6:01:52
yourselves have the ability to make your own libraries up until now we've been
6:01:57
writing all of our functions in our one file hello pi and everything since and
6:02:03
now that we've introduced modules in Python like random and statistics we can
6:02:08
import those that come with python but that's other people's code as well and we've now used Pip this package manager
6:02:14
to install third- party packages as well in the system and using other people's code still but to come full circle what
6:02:20
if you yourself find yourself implementing the same kinds of functions again and again or you find yourself
6:02:26
opening up old programs copying and pasting code you wrote into new programs because you have the same problem yet
6:02:32
again a good practice would be to somehow bundle up that code you keep reusing and make your own python module
6:02:40
or package you can keep it local on your own Mac or PC or Cloud Server or you can go through the steps of actually
6:02:46
bundling it up making it free and open source and putting it on something like pii for others to use as well okay I'm
6:02:53
going to go ahead and run code of sayings. py to create a brand new file called sayings dopy which is going to be
6:02:58
my own sayings module and I'm going to define a couple of simple functions in there I'm going to define a hello
6:03:04
function that's going to take name parameter is input and that function is simply going to print out an F string
6:03:11
that contains hello comma and then in curly BRAC whatever that person's name actually is then I'm going to go ahead
6:03:17
and Define one other function a goodbye function that has def goodby also takes
6:03:22
a name as its input and then that prints out by contrast an F string that says goodbye comma and then in curly brace's
6:03:30
name and now just for good measure just so I can be sure that these functions are working as expected I'm going to go
6:03:36
ahead and Define a main function in here too just for the purposes of testing and I'm going to go ahead and Define a main
6:03:41
function that simply does a couple of tests for instance it calls uh hello of
6:03:48
quote unquote worlds shall we say and then it's going to call goodbye of quote unquote world as well and hopefully what
6:03:55
I'll see on the screen then is hello world and goodbye world when I run this program of course as always I need to
6:04:00
explicitly tell python to call that function so I'm going to call Main at the very bottom of this file all right
6:04:05
all right let's try it out python of sayings. py enter and indeed I see Hello
6:04:10
World and goodbye world and so I think it's reasonable for me to assume that these functions albeit simple are pretty
6:04:16
correct at this point but now suppose that I want to use these functions as though I've indeed created my own
6:04:22
Library my own python module that makes available a hello function for me or anyone else who wants to use it or a
6:04:28
goodbye function as well well let me go ahead and open up again say. py but start fresh and rather than have the C
6:04:35
say anything let me go ahead and have my own Library do the talking so I'm going
6:04:41
to go ahead and as before import CIS so that I have access to command line arguments and from my own module called
6:04:48
sayings I'm going to import hello so because I created a file called sayings.
6:04:53
py I can say from sayings and it's inferred by python that I mean sayings.
6:04:58
py at least in this current directory but I specifically going to import just one of the functions for now namely
6:05:03
hello and now I can do something like this if the user obliges by giving me two command line arguments which I can
6:05:10
check by just checking the length of cy. argv I'm going to then go ahead and call
6:05:15
this new hello function passing as its input assist. arv bracket one which
6:05:20
should hopefully be the person's name which I'm going to expect them to type at the prompt so here we go I'm going to go down to my terminal window run python
6:05:27
of s.p and my own name because I want my own name to end up in the command line arguments and therefore be part of the
6:05:33
hello so when I hit enter and just a moment I should hopefully see hello comma David so here we go enter and huh
6:05:42
I see Hello World Goodbye World and then I see hello David so why is this
6:05:48
happening well it turns out even though I've done everything according to our own past practice it's not really the
6:05:56
right way to go about calling Maine after all if I'm blindly calling Maine here at the bottom of my file that means
6:06:02
whenever this file is loaded by python Maine is going to get called and unfortunately that's true even if I'm
6:06:08
importing this file or just a function from this file as I am here in my s.p
6:06:13
program this is to say on line three here when I say from sayings import hello this effectively tells python to
6:06:20
go find that module sayings. py read it from top to bottom left to right and then import specifically the hello
6:06:26
function unfortunately by the time python has read the file from top to bottom left to right that last line of
6:06:32
code recall is to call Maine Maine gets called no matter what so really the
6:06:37
right way to go about using a main function which does solve that problem of ensuring that we can order our
6:06:43
functions however we want and all the functions will be defined at the time they're invoked I shouldn't be
6:06:49
unconditionally calling main at the bottom of this or really any of my programs I should instead use this
6:06:54
technique I should say if underscore underscore name underscore underscore
6:06:59
equals equals quote unquote underscore uncore maincore uncore close quote then
6:07:05
and only then should you actually call Main well it turns out that this variable is a special symbol in Python
6:07:12
underscore uncore name underscore underscore and notice that vs code because of its font isn't quite showing
6:07:18
those two underscores but they're indeed there to the left and the right this is a special variable whose value is automatically set by python to be quote
6:07:25
unquote main when you run a file from the command line as by running python of
6:07:32
sayings. piy so Watch What Happens now with this additional conditional in sayings. py if I run python of sayings.
6:07:40
py it still works as before because name will be automatically set to underscore
6:07:47
uncore maincore uncore when I run this file using python ofs sayings. py but
6:07:53
notice this name is not going to be set to quote unquote main it's going to be set to something else technically the
6:07:59
name of the module when I instead import the file like I do here so this
6:08:04
highlighted of code even though it will cause python to go find sayings. py read it from top to bottom left to right it's
6:08:11
going to ignore the call to main this time because it's wrapped in that conditional in this case when I'm importing a file and not running it
6:08:18
directly at the command line Maine will not get called by definition of name's value so let me go ahead and try this
6:08:25
instead of running python of sayings. py which is the module which contains that conditional main let me go ahead here
6:08:32
and run python of say. py which is the program here before me that Imports
6:08:37
hello from sayings but because of that conditional it's not going to say hello to anyone else except me in this case
6:08:46
all right we're here at the end of our week it's only appropriate I think to import something other than hello why
6:08:51
don't I go ahead and import not hello but goodbye from here let me go ahead and call goodbye instead of hello and
6:08:58
this time when I run python of sayy I'm not going to type my own name allow me if I may to type in the whole world so
6:09:04
that our final sentiment today is goodbye World indeed that's it for this week we will see you next time
6:09:17
[Music]