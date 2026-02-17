
6:09:37
all right this is cs50's Introduction to programming with python my name is David men and this is our week on unit tests
6:09:45
up until now we've been writing a lot of code and you might have been testing your code by running your program and
6:09:50
passing in some sample inputs and running it again and passing in some sample inputs or you might have been waiting for us to test your code instead
6:09:57
but it's actually much better practice to get into the Habit sooner rather than later of testing your own code using
6:10:04
Code of your own in fact whether you're writing a personal project or working in industry it's very common nowadays to
6:10:09
not only write code to solve the problems that you want to solve but also to write a little extra code to test the
6:10:15
code that you wrote and that's what we're going to focus on today writing our own test so as to be all the more
6:10:20
confident all the more certain that the problems we have been trying to solve are in fact solved correctly so let's
6:10:26
rewind a few weeks now to a program we wrote a while back namely to to
6:10:32
calculate uh numbers and specifically we left off with this calculator on trying to compute the power of a number like X
6:10:39
squar or uh where X might be two or three or some other number as well well let me go ahead and resurrect that file
6:10:46
by going into my terminal window here and running again code of calculator. Pi
6:10:52
and let me go ahead and pick up where we left off way back when by defining a main function here and then in my main
6:10:58
function I did something like this I said x equals int of input and I asked the user what's X question mark and then
6:11:06
I immediately went ahead and printed out something like x^2 is and then I passed
6:11:12
in as a second argument to print the result of calling a function called Square passing in that value X now of
6:11:18
course I haven't yet implemented the square function so let's define that as well let me go down a couple of lines
6:11:24
and Define square and it takes an argument recall a parameter that at the time I called n for number so I'll do
6:11:31
that again though I could technically choose any name for this variable and I call did this I returned n * n and there
6:11:38
were multiple ways to do this the squaring a number is multiplying it by itself so I could also use other syntax
6:11:45
here but this is what we ultimately settled on and then recall that I ultimately called Main in order to kick
6:11:50
off the process of running this program so just as a test manually let me go ahead and run python of calculator. piy
6:11:57
and hit enter what's X let's start with two all right x^2 is 4 I think that's
6:12:02
correct so let's run it again just for good measure of calculator. Pi let's type in three for X this time x^2 is 9
6:12:10
and I think that's correct and I might be feeling pretty good at this point and I go off and submit my code to a course
6:12:15
or I post it on the internet for others to use but I haven't really methodically tested this code and it's not
6:12:21
necessarily the case that it works entirely in fact I haven't really considered a number of corner cases I went with some pretty obvious numbers
6:12:28
like two and three but what about zero what about negative numbers what about any number of other infinite numbers
6:12:34
well we're not going to test infinite number of inputs to this because the program would never halt but we should test some representative inputs
6:12:41
ultimately but before we do that let's get into the habit of making sure that Maine isn't always called let's adopt
6:12:47
this habit again of doing if underscore uncore name underscore underscore equals equals quote unquote underscore uncore
6:12:55
maincore underscore only then should we execute Main and I'm doing this now
6:13:00
proactively because I want to make sure that when I import my Square function
6:13:06
perhaps from another library from another file treating it as though it's a library I want to make sure that main
6:13:11
is not just automatically called itself now what do I want to do from here now
6:13:17
that I've modified this program as follows well let's go ahead and write a completely different program whose sole
6:13:22
purpose in life is to now test this program so I've got my actual calculator in calculator. I've readed myself to
6:13:30
call Main conditionally so that I can safely import one or more things from this file in another file well what
6:13:37
should that other file be well by convention I'm going to create a file that's called test underscore and then
6:13:42
because the thing I'm testing is this calculator itself let's call this file test calculator. piy that's going to
6:13:48
give me a new tab in which I can write a brand new program whose purpose in life is now specifically to test that program
6:13:54
but really that program's specific functionality built into that program is the square function let's focus on
6:14:00
testing that function all right so how do I access that function in this program well recall that I can import a
6:14:07
function from another file as though it's a library of my own a so-called module so I'm going to do this from
6:14:13
calculator import Square I could go ahead and just import Square itself but
6:14:19
then I would have to prefix my use of square recall by saying calculator dot everywhere and it's just a little
6:14:25
cleaner to just import the one function and now let me go ahead and do this let me go ahead and Define a function called
6:14:32
test Square this two is a convention if you want to test a function called Square your function for testing should
6:14:38
be called testore Square or alternatively you could do Square underscore test but I'll adopt this
6:14:44
convention here now what kind of tests can we do well I don't dislike the test I ran earlier testing xals 2 and x
6:14:51
equals 3 but every time I uh want to test my program previously I would have to do that manually and that's going to
6:14:56
get tedious it's not going to be easy for someone else to test it and if I'm actually working in the real world it would be nice if I could automatically
6:15:03
have my program tested again and again by having some automated process run my own code so let's do that and take the
6:15:09
human ultimately out of the equation so how might I go about testing the square function that I've now imported per line
6:15:16
one well in my test Square function why don't I do this if uh the result of
6:15:21
calling square of two does not equal four why don't we go ahead and print an error message because I know that in the
6:15:27
real world 2 squared should equal four so if square of two does not equal four
6:15:33
there's a bug in my program there's a bug in my function I've made a mistake so let me go ahead and print something like that so I or someone else knows 2^2
6:15:41
was not four for instance so I could print out anything here what should I maybe next test well let's do more than
6:15:47
one test let's say if the square of three does not equal 3^2 9 then let's go
6:15:53
ahead and print out that 3^ SAR was not 9 so I haven't done any more testing
6:15:58
than I did earlier but I've baked those two tests xal 2 and xal 3 into my own
6:16:05
code here so I can now run those tests automatically if you will now it's not enough to just Define a function called
6:16:12
test Square I actually if I want to run this function need to call it somehow and our convention for doing that is the
6:16:17
same as always in this function here in this file two let me Define Main and Main's sole purpose in life is going to
6:16:23
be to test square and now at the bottom of this file as before let me go ahead
6:16:29
and adopt my Convention of if underscore uncore name underscore uncore equals equals quote unquote underscore uncore
6:16:35
maincore uncore then go ahead and call Main so a lot of this is just boilerplate like we've seen this before
6:16:42
defining a main function and calling a function to kick off some process now adding the conditional at the bottom of
6:16:47
the file to make sure I'm only conditionally calling main just in case I import anything from this file
6:16:52
elsewhere so let's see let's go ahead and test my code now let me go ahead and run test calculator with python and hit
6:17:00
enter and nothing outputs nothing outputs but I think it's okay I think no
6:17:07
output is good because look at my test Square function I'm not printing anything if all seems well so let's
6:17:14
let's demonstrate as much by going back to my calculator and let me break it let me introduce a bug maybe I didn't even
6:17:19
get it right the first time maybe my code originally looked like this I wasn't thinking I forgot my squares and
6:17:24
so I thought that the square of a number is n plus n instead of n * n so a
6:17:30
reasonable mistake to make perhaps arithmetically let me now go back to my test calculator which which I'm not going to change but I am going to rerun
6:17:37
it python of test calculator. Pi going to cross my fingers here but for not I'm
6:17:42
going to see immediately that 3^ SAR was not n now what is it well let's see when
6:17:49
your tests fail how can we put our finger on what's wrong well it's a little interesting that I completely broke my Square function and yet only
6:17:57
one of these tests is failing it looks like this test lines 9 and 10 is fine
6:18:03
because I'm not seeing that output but of course these two lines this test is failing because 3^ s is not n when I'm
6:18:10
using plus so just to be clear here why is my function only partially broken
6:18:17
just to be clear why am I seeing only one error instead of two even though the square function is now mathematically
6:18:24
broken because 2 plus two is four no yeah I mean it's as simple as that I just got lucky that 2+ 2 is the same
6:18:30
thing as 2 * 2 so this is one of those Corner cases and this is why it's good to be in the habit of not just testing one thing but test several and make sure
6:18:37
you're covering your bases so to speak so I got lucky here and that explains why I'm seeing only one error even
6:18:43
though the function itself is flawed but let me propose that there's another way we could do this because honestly if I
6:18:49
extrapolate from this simple example running not just two tests but three or four or 10 or 20 tests you can imagine
6:18:57
that my God the code is going to get so much more complicated than the function itself I mean already look in
6:19:03
calculator. the function in question is two lines long and yet in test calculator the fun code in question is
6:19:10
five lines long like I've written more code to test my code than I actually wrote original code so the fewer lines
6:19:16
of code we can write when testing code I think the more likely you and I are to do it because it's going to be literally
6:19:22
a little less work and just fewer opportunities for mistakes so what's another approach I can take here well it
6:19:28
turns out in Python there is another keyword that we haven't yet used which is this here assert
6:19:35
assert is a keyword in Python and some other languages as well that allow you to do exactly that as in English to
6:19:41
assert that something is true to sort of boldly claim that something is true and if it is nothing's going to happen no
6:19:48
errors are going to appear on the screen but if you assert something in Python and it is not true that is the thing
6:19:54
you're insert asserting a Boolean expression is false you're actually going to see some kind of error on the
6:20:00
screen so let's go ahead and try this new keyword as follows let me go back to my code here and just to make it a
6:20:06
little simpler let me propose that I I use this new keyword as follows let me
6:20:12
simply assert that the square of two should equal four so I've changed my
6:20:18
logic instead of checking for not equals I'm now asserting very loudly that it should equal four and then on one
6:20:25
additional line let me do the other test assert that the square of 3 equals equals 9 and that's it no if no indented
6:20:34
print I'm just going to assert more simply these two things that I want to be true well let me go ahead now with
6:20:41
calculator. pi still broken I'm still using plus accidentally instead of
6:20:46
multiplication let me go ahead now and run python of test calculator. Pi
6:20:51
crossing my fingers as always but it's not going to go well this time a whole lot of Errors seem to appear on the
6:20:57
screen and if I scroll up here for this traceback we'll see that the thing that failed was this line here assert Square
6:21:04
of three equals equals 9 now unfortunately when you're using the assert keyword it's not terribly
6:21:09
userfriendly it shows you the files and the line numbers involved but it does show you the specific line of code that
6:21:15
failed the assertion that failed so to speak it's now kind of up to you and me to infer from this well wait a minute
6:21:22
why is the square of three not equal to 9 so it's not super user friendly but honestly it was like half as much code
6:21:27
for me to write it's just two lines instead of those previous four but notice this little Remnant down here
6:21:32
this was an assertion error and we have seen errors before we've seen errors
6:21:38
before when we've made other mistakes in our code and in the past what was our solution for catching those
6:21:46
errors how do we catch errors that seem to resemble this even though we've not
6:21:51
seen this one before um try and accept yeah in Python we can use the try and
6:21:56
accept keywords to try to do something optimistically except if something goes wrong do something else instead so this
6:22:03
is a step forward and that I can at least catch this error but it's going to be perhaps a step backward and that I'm
6:22:08
going to end up writing I'll admit in advance a little more code uh instead so let me go ahead and try this let me go
6:22:14
back into my code here and instead of just asserting blindly let me go ahead is to proposed and try to do this first
6:22:23
assertion except if there is an assertion error like we saw a moment ago
6:22:28
then go ahead and print out something more userfriendly that explains what actually failed 2 squar
6:22:34
is uh was not four and let me go ahead similarly and try to assert that the
6:22:40
square of 3 equals 9 except if there's an assertion error there in which case
6:22:46
I'm going to print out more user friendly 3^ squar was not n so I've
6:22:51
taken a step forward but also a step back because now I have more code but I have at least introduced assertions and
6:22:57
exceptions in a manner consistent with how we've seen it in the past when something goes wrong you actually see an
6:23:02
exception raised well let me go ahead and run this version of the program now instead python of test calculator.
6:23:08
crossing my fingers all right it still failed because I'm seeing output but we're back to at least userfriendly
6:23:15
output so that's at least progress in some way here but it's again more code
6:23:21
than might have been ideal and in fact if we continue this further what if we actually want to add additional test
6:23:26
cases here as well well it seems like we might end up writing way more code than
6:23:31
would be ideal for instance I'm testing two and three now I should probably test some negative numbers as well so why
6:23:37
don't I go ahead and add in for instance let me go ahead and copy and paste this let me try to assert that the square of
6:23:44
-2 equals equals 4 which should be the case mathematically and if not let me go ahead and change this to say -22 was not
6:23:52
four and you know what let me go ahead and copy paste this again test another negative number just for good measure
6:23:57
let's test the square ofg -3 which should equal 9 but if it doesn't let's
6:24:02
go ahead and say that -32 was not 9 and just to think aloud here what might be
6:24:08
another good value to test I've tried two I've tried three I've tried ne-2 I've tried negative3 I can't try in
6:24:14
infinite numbers but there's at least something that's a little different in between those values let's try zero zero is an interesting case too just in case
6:24:21
something might be wrong and Y zero I'm just going with instincts here right odds are positive numbers are generally
6:24:27
going to behave the same negative numbers might generally behave the same zero might be a little anomalous there's no uh science to it necessarily
6:24:34
but rather considering for yourself based on your own experience like what are the potential Corner cases based on
6:24:40
the function you're trying to test I'm trying to test something mathematical so I want to test representative values so
6:24:45
let me go ahead and paste in one more try accept block let's assert that the square of zero should equal zero and if
6:24:51
not I'll say something explanatory like 0^ squar was not zero now if I go ahead
6:24:57
and run this python of test calculator. piy and hit enter now I see multiple
6:25:03
errors and and this is interesting it's a bit of a clue because notice that some but not all of these assertions are
6:25:09
failing the one for 2^ SAR is apparently okay as we noted earlier recall that 2^
6:25:16
SAR happens to be 2 plus 2 so that bug doesn't really throw off our test but it's a good thing we tested for three
6:25:22
it's a good thing we tested for neg -2 and neg3 because all of those tests caught this error the zero test did not
6:25:28
notice because 0 squared is of course 0 but 0 + 0 is 0 so we're getting lucky or
6:25:34
unlucky there depending on how you you view the glass is half full or half empty here we at least by way of having
6:25:40
multiple tests caught this mistake somehow so it would be nice though if we
6:25:45
weren't writing so much darn code here right because notice what I've done I have try except try except I have all of
6:25:53
these assertions I have a main function I have this if conditional at the bottom of my file I mean honestly who's going
6:25:59
to want to write 31 lines of code now just to test a two line function right
6:26:05
no one's going to write test code like this if we're all writing so much more code to do the actual testing so people
6:26:12
have solved this problem if you are in the habit of testing your code a lot or wanting to if I'm in the habit of wanting to test my code a lot if
6:26:18
everyone else in the real world is in this habit of wanting to test their code why don't we create tools that make it a
6:26:23
little easier to do so and in fact there is a mechanism for doing this whereby we
6:26:28
can use a tool that's popularly called pest so py test is a third-party program
6:26:33
that you can downloaded install that will automate the testing of your code so long as you write the tests but
6:26:40
what's nice about this library and others like it is that it adopts some conventions so that you don't have to
6:26:45
write as many lines of code yourself manually they do some of that automatically for you now this is a
6:26:52
thirdparty library there's other libraries for unit tests uh so to speak that is testing units of your code uh
6:26:57
some of them come with python itself we're proposing that we look at py test today because it's actually a little
6:27:03
simpler than the unit testing Frameworks that come with python itself and what do we mean by unit testing unit testing is
6:27:09
just a formal way of describing testing individual units of your program what are those individual units they're
6:27:15
typically functions so unit tests are typically tests for functions that you have written now what does this mean in
6:27:22
practice here well let me go back to my VSS code here and let me propose that we
6:27:27
simplify my test calculator significantly I'm going to go ahead and delete all of these tests which were
6:27:34
um which we're accumulating to like 31 lines of code and let's see if we can distill the tests to their Essence using
6:27:41
p test from my same calculator program let me still import Square so I do still
6:27:46
need that line of code so that I can test that specific function now I'm going to go ahead and Define a function just like I did before as follows I'm
6:27:53
going to define a function called test Square Again by convention test underscore and the name of the function
6:27:58
you want to test though it doesn't have to be that way and now I'm going to go ahead and make a few assertions I'm
6:28:03
going to assert that the square of two should equal four I'm going to assert that the square of three should equal 9
6:28:10
I'm going to assert that the square of -2 should equal 4 and I'm going to
6:28:16
insert that the square of -3 should equal 9 and lastly for now I'm going to
6:28:21
assert that the square of 0 should equal zero so I'm still using the assert keyword as I introduced earlier and even
6:28:28
though it was a little tedious to type those I mean it's only eight lines of code now and they're so easy to type
6:28:33
it's try and accept and all of this wouldn't it be nice if something else
6:28:38
someone else handled the try the accept the printing all of the standardization
6:28:45
of actually running these tests and that's where indeed P test comes into play per the documentation for py test
6:28:51
which can itself be installed with Pip install py test which we've used to install other libraries in the past you
6:28:57
can look at the documentation here for all of its formal usage but fortunately pest is pretty userfriendly
6:29:04
testing Frameworks go and it actually allows us to Dive Right In by just running P test on the code that we've
6:29:09
written so if I go back to vs code here and look at my test calculator. piy which notice has no main function
6:29:15
anymore it has no conditional it has no tries it has no accepts it has no prints
6:29:20
it just has my few assertions Pi test and other libraries like it are going to automate the process of running these
6:29:27
tests for me and informing me on the screen whether or not any of those tests
6:29:33
failed so so let me go ahead and do this I'm going to go ahead and increase the size of my terminal window for a moment
6:29:38
just so we can see more on the screen and I'm going to run not python as I've been doing I'm going to run Pi test
6:29:44
which again is this third party tool for running tests in your code I'm going to run Pi test of testore calculator so
6:29:52
that same file I'm going to cross my fingers as always and hit enter and we'll see that ah something has failed
6:29:59
now admittedly even though I do think you'll find that Pi test is relatively simple to use its output at least at
6:30:06
first glance is not necessarily super user friendly so what are we seeing here we'll notice at the very top of my
6:30:11
window is the command that I ran after my prompt right below that is a single F
6:30:17
in red which means fail so not very encouraging I tried really hard here but fail is my grade on this program but
6:30:24
let's see exactly what happened well if I look at this excerpt here under failures you'll see that test square is
6:30:30
the function that failed all right that makes sense because that's the only one I wrote and you'll see here somewhat uh
6:30:35
Arcane output describing what the error was so what you're seeing here is the first line of output equals equals 4
6:30:42
which was fine there's no red error message below that so that one's okay but this line of code here assert that
6:30:47
square of three equals equals 9 pi test did not like that assertion because it didn't end up being true in fact per the
6:30:55
red e at the start of this line You'll see that I'm effectively trying to assert that 6 equals equals 9 now where
6:31:04
did the six come from okay wait a minute if my test involves this notice that where 6 equals square of three this is
6:31:10
saying that because I've called Square passing in a value of three it turns out its return value is six and of course
6:31:18
mathematically six does not equal equal 9 so that's why this is failing now Pi
6:31:23
test is not as user friendly as telling you exactly why the bug is there or how
6:31:29
to fix it this is really just a clue to you what must be wrong what you're seeing here is a clue that the first
6:31:35
test passed because there's no red error below that line of code but this test failed somehow or other your Square
6:31:43
function is returning six when passed in three instead of nine so at this point
6:31:49
you sort of put your detective hat on you go back to your actual code and you think about in calculator to Pi how in
6:31:54
the world is line seven of my square function returning six instead of nine
6:32:00
and at this point odds are the light bulb would go off above your head proverbially and you would see oh I'm
6:32:06
using addition instead of multiplication but what P test has done for us is automate the process of at least
6:32:12
pointing out that error for us and if I now go in and fix this let me go ahead and the light bulb has gone off I change
6:32:18
the plus to a uh to multiply now I'm going to go ahead and after clearing my
6:32:23
screen I'm going to run not python but Pi test of test calculator. Pi crossing
6:32:29
my fingers again and now it's green and I see just a DOT which indicates that my one and only only test passed I'm good
6:32:36
100% success with my test now after fixing that bug all right let me pause here and see if there's any questions so
6:32:44
my question is what if a user uh instead of because we are taking input from the
6:32:49
user what if the user is uh somewhat malicious and types in a string instead
6:32:54
of an integer or maybe he types in a float or some other data type yeah so
6:33:00
what if the user like we've seen in past examples types in instead of a number when we're expecting an integer how do
6:33:06
we test for something like that at the moment I'm admittedly not testing user input if I go back to my code here
6:33:14
notice that my calculator function of course has the square function that we keep testing and retesting but notice
6:33:19
that all of the user input is currently relegated to my main function and admittedly as of now I am not testing my
6:33:26
main function so they could be one of those bugs and in fact there would be because if the user types in a string
6:33:32
like cat instead of an integer like two or three then line two recall would
6:33:37
actually raise a value error exception so we've seen that before so when it comes to testing your code this is
6:33:44
actually a good reason for having multiple functions in your program rather than putting all of your logic in
6:33:50
just the file itself rather than putting all of the logic in just main it's actually really good really helpful
6:33:56
practice to break your ideas up into smaller bite-sized functions that themselves are testable and what do I
6:34:02
mean here Square is perfectly testable why because it takes as input a
6:34:07
parameter called n and it returns as output an integer which is going to be
6:34:13
the square thereof hopefully it has a well-defined input and a well-defined output it is therefore completely within
6:34:19
your control in your test program to pass in those values now I will say if
6:34:24
you want to test whether Square behaves properly when past something like a
6:34:30
string like quote unquote cat we could absolutely do something like this assert that the square of uh quote unquote cat
6:34:38
it's not going to equal something you can actually using different syntax assert that a specific exception will be
6:34:43
raised so if we were actually going to go back into our Square function improve it and deliberately raise an exception
6:34:49
we could test for that too but for now I'm deliberately only testing the square function I'm not testing for specific
6:34:56
user input but that's another problem to be solved other questions now on unit tests uh do use the units
6:35:04
test to test the code for the C cs50 check so check 50 is
6:35:11
similar in spirit cheze 50 is a tool that we cs50 wrote that is essentially doing something like pie test for the
6:35:18
evaluation of students code it is similar in spirit but think of cze 50 as
6:35:23
being an alternative to P test if you will but it works a little bit differently but same idea pie test and
6:35:29
unit testing more generally is a technique that is independent of cs50 and is something that you can and should be doing on your own code both in or
6:35:37
outside of this class how about one other question here on on um on our uh unit tests uh my
6:35:45
question is instead of writing four times like s square of 2al 4 uh instead
6:35:50
of that can we write if is uh I is equals to in square brackets the numbers we want instead of writing four lines a
6:35:58
really good question absolutely right now if I go back to test calculator. it's in pretty manual I mean it took me
6:36:05
a while to say and to type out those several lines and you could imagine writing some kind of loop to just assert
6:36:11
in a loop that this equals that that this equals that and so forth using a list or using maybe a list or a
6:36:17
dictionary or some structure like that so yes you can absolutely automate some of these tests by not just doing the
6:36:22
same thing again and again you can still use all of the syntax of python to do loops but generally speaking your test
6:36:28
should be pretty simple and in fact let me propose that we improve upon even
6:36:33
this design further because at the moment what's not really ideal when I
6:36:38
run all of this uh when I run all of these tests when my uh function is buggy
6:36:43
is notice the output that I got let me reintroduce that same bug by changing my multiplication back to addition let me
6:36:50
increase the size of my terminal window again and let me run Pi test again of test calculator. Pi so this is the
6:36:56
version of my code now that has the bug again so I'm going to see that big massive failure where this failure has
6:37:04
been displayed to me but this is not as helpful as it could be right because I have all of those other tests in my code
6:37:11
recall that I had what 1 2 3 four five separate tests and it I'm only seeing the output of the first now why is that
6:37:17
well if we go back to my code here you'll see that the first assertion that's failing namely this one here that
6:37:24
assert of square of three equals equals 9 the other tests aren't even getting run and that's not a big deal in the
6:37:31
sense that my code is buggy so one or more of them are probably going to fail anyway but wouldn't it be nice to know
6:37:36
which of them are going to fail and in fact it's ideal to run as many tests all at once as possible to give you as many
6:37:42
Clues as possible to finding your bug so let me propose that we improve the design of my testing code now still
6:37:49
using pi test as follows instead of having one big function called test square that tests the entire function
6:37:56
itself with so many different inputs let's break down my tests into different categories and here too there's no one
6:38:03
right way to do this but my mind is thinking that I should maybe test positive numbers separately test
6:38:09
negative numbers separately and test zero separately I could think of other ways I could test even numbers I could
6:38:14
test odd numbers or maybe some other pattern alt together but separating this big test into multiple tests is probably
6:38:20
going to yield more clues for me when something goes wrong so let me do this let me go ahead and rename this function
6:38:26
to test positive initially and let me include in that function only those first two tests let me then create
6:38:33
another function here called test negative and in this function let me
6:38:38
test only -2 and -3 then down here let me do one more def of test zero and I'll
6:38:45
just run one test in there so I have the same assertions the same five but I've
6:38:50
now divided them up among three separate functions what's nice about Pi test and other unit testing Frameworks is that
6:38:57
all three of these test functions will be run automatically even if one of them fails the others will be attempting
6:39:04
that means that if one or two or three of them fail I'll have one or two or three Clues now for helping me find that
6:39:10
mistake so let me go ahead and again increase the size of my terminal window just so we can see more on the screen my
6:39:16
calculator still has the bug using addition instead of multiplication let me go ahead and run not python but again
6:39:22
Pi test of test calculator. piy crossing my fingers as always and now oh my God
6:39:27
there's even more errors on the screen but this in itself is more helpful let's work through them from top to bottom so
6:39:34
under failures here in all caps which I know is not very encouraging to see failure when you're just trying to solve a problem but that's what these
6:39:40
Frameworks do under failures the first function that failed is test positive but here too we see the same clue as
6:39:47
before the first one two the square of two equals equals 4 that one's fine it's not airing with any red errors but the
6:39:53
next one is failing so I know that square is broken when I pass in three all right what about down here it looks
6:39:59
like unfortunately my test negative function is failing to why well when I pass in oh this is interesting here now
6:40:06
-2 doesn't even work so I got lucky with positive two but negative -2 isn't working so that's a bit of a clue but in
6:40:13
total only two tests failed so notice at the very bottom this summary two failed
6:40:19
and one passed what's the other one what was the third one test zero so test zero is passing these two are failing and so
6:40:27
that kind of leads me logically mathematically if you will to the source of the bug and just to be clear too if
6:40:32
you have a lot of tests this little oneline output is helpful even though also a bit discouraging fail fail and
6:40:39
Dot means pass so there are the three tests just depicted graphically a little bit differently well let me rewind now
6:40:46
and go back into calculator. Pi let's fix that bug because let's suppose that
6:40:51
I've deduced okay I'm using addition I should have been using multiplication all this time let me now after fixing
6:40:57
the bug yet again let me go back to my big terminal let me run Pi test of test calculator. Pi hitting enter crossing my
6:41:03
fingers now and dot dot dot means all is well 100% of my tests passed all three
6:41:08
of them so now I'm good it doesn't necessarily mean that my code is 100%
6:41:14
correct but it does mean that it has passed 100% of my current tests and so
6:41:20
it would probably behoove us to think a little harder about maybe we should test bigger numbers maybe we should test even
6:41:26
smaller numbers maybe we should test strings or something else the onus is ultimately on you to decide what you're
6:41:31
going to test but in the real world you're going to be very unhappy with yourself or someone else maybe your boss
6:41:37
is going to be very unhappy with you if you did not catch a bug in your code which you could have caught had you just
6:41:43
written a test to try that kind of input all right let me pause again and see if there's any questions now on unit
6:41:49
testings with P test um so if you wanted to test like someone suggested before
6:41:55
user input as well as testing your function do you do that within the same
6:42:00
file or do you make separate files for different types of test really good question you could absolutely make separate files to test
6:42:07
different types of things or if you don't have that many you can keep them all in the same file at the moment I've
6:42:12
been storing all of my tests in one file for convenience and there's not terribly many of them but we'll take a look in a
6:42:17
bit at an example that allows me to put them into a folder and even run P test on a whole folder of tests as well so
6:42:24
that's possible other questions on unit testing so I've got two questions um so
6:42:31
a couple while ago you just used um an exception called assertion um I'm not sure what was oh
6:42:37
yeah assertion error um what exactly does that particular error catch and my
6:42:44
second question is does the assert keyword um stand out to the compiler and
6:42:51
exactly tell them to assert this particular um line of code indeed the
6:42:57
assert keyword we're seeing and the assertion error we saw earlier are intertwined so when you use assert and
6:43:04
the assertion fails because whatever Boolean expression you're using is not true it's false an assertion error by
6:43:11
definition of python will be raised so those two work in conjunction those errors those assertion errors are still
6:43:18
being raised by my code here when any of these lines of code fail however pest
6:43:24
this third party library is handling the process of catching those exceptions automatically for me so as to give me
6:43:30
the standard output so we started to today's Story by really implementing unit testing myself I wrote all of the
6:43:36
code myself I wrote main I did my conditional I did try except honestly it's going to get incredibly painful to
6:43:42
write tests long term if you and I have to write that much code every time especially when our function is this small uh so pie test and unit testing
6:43:49
Frameworks like it just automate so much of that essentially P test adds the try
6:43:54
the accept the if the prints for you so you can just focus on the essence of the tests which really are these inputs and
6:44:01
outputs how about time for one other question here on unit testing as well sir uh when we uh enter minus 6 or
6:44:09
minus5 uh the uh square or Square uh square root of the that uh number comes
6:44:16
up but when we put 6.6 or 5.6 something like that integer then
6:44:22
uh line shows error so what's happening there so if I'm deliberately testing
6:44:29
integers right now in large part because I only want pow to operate on inte ERS and that might be conveyed in Python's
6:44:34
documentation or my own documentation for that function if we were to pass in something else like a float it turns out
6:44:40
that floating Point values in Python and other languages are actually very hard if not impossible to represent 100%
6:44:48
precisely and so if you are trying to compare it against some other value they might be slight rounding errors as a
6:44:54
result I'm just inferring from what you've described but I'm very deliberately now testing this function with only the inputs that I would expect
6:45:02
it might indeed throw other errors if other inputs are passed all right allow me to propose that we consider what
6:45:08
should happen if Square isn't actually passed a number for instance if I go back to calculator. Pi and suppose that
6:45:15
I or perhaps someone else using my Square function simply forgets to convert the return value of input from a
6:45:21
stir to an INT as by modifying line two here well now something's definitely going to go wrong if I type in a stir
6:45:28
instead of what appears to be an INT for instance if I clear my terminal here run pip Pyon of calculator. Pi and hit enter
6:45:35
let's type in cat as our value for x and of course this raises Now a type error
6:45:41
why can't multiply sequence by non-int of type stir what does that mean well you can't do cat times cat because
6:45:47
indeed square is expecting that n will be some number but that doesn't necessarily mean that square itself is
6:45:52
buggy but this does mean that if I expect a type error to be raised let's test for that too so that I know the
6:45:58
behavior indeed works as expected so let me go back to test calculator p and let
6:46:04
me go and add a fourth test down here how about Define testore and I'll call
6:46:09
this tester because I'm going to specifically and deliberately pass in a stir for testing and I want to in spirit
6:46:16
assert that passing in something like cat to square will raise a type error
6:46:21
but we don't use the assert keyword for that rather we need this let me go to the top of this file and let me
6:46:27
additionally import the pest Library itself because it turns out there's a function in that Library called raises
6:46:34
that allows me to express that I expect an exception to be raised and I can express that as follows with pest.
6:46:42
raises and then in parenthesis I can pass in the type of exception I expect which is going to be a type error in
6:46:48
this case and now when do I expect that type error to be raised whenever I do something like calling square and
6:46:54
passing in not a number but something like cat so now if I go back to my terminal window run Pi test of test
6:47:01
calculator. piy this time having four tests I should see that all four now are
6:47:07
successful all right let's now consider how we could test code that doesn't just expect numbers as input but actually
6:47:14
strings and let me rewind Us in time here in VSS code to that very first program rewrote a few different versions
6:47:21
of in hello.py that ultimately looked a little something like this I had a main function that prompted the user for the
6:47:28
value of a variable by asking them what's your name question mark and then we went ahead and did something like
6:47:34
hello open pen name passing that user's name into a function called hello now
6:47:40
that function hello recall ultimately looked like this we defined hello as taking a parameter called two the
6:47:47
default value of which was world and that function very simply printed hello
6:47:52
followed by a comma and then whatever the name that had been passed in and then we ultimately called main but for
6:47:59
now onward I'm going to always add this if conditional if name equals equals underscore uncore main then and only
6:48:06
then do I want to call Main so that's essentially what this program looked like in its last Incarnation how do we
6:48:12
go about testing it well here again too I'm not going to test the user's input per se in main I'm going to focus really
6:48:18
on the module the module of code here that's of Interest which is the hello function itself how can I go about
6:48:24
testing the hello function well unfortunately even if I start by doing
6:48:29
something like code of test hello.py let me go about and start writing a test
6:48:35
program I could import from my hello program a function called hello so a bit
6:48:40
strange to see from Hello import hello but notice that on this line here I'm importing from the module that is the
6:48:46
file called hello.py the function called hello and how do I go about testing this
6:48:53
well if I have a function like Define uh test argument like this well let me Sue
6:49:00
this so if I were toine a function like like Define test hello what could I do
6:49:06
well I could call hello with quote unquote say uh David and then check if
6:49:14
it equals what hello comma David so would this work this approach here if
6:49:20
I've written a test called test hello that calls hello with an argument of David and then tests its return value
6:49:27
just like we've done for our calculator would this work as written
6:49:33
and let me go back to in just a moment the version of hello that we're testing so you can see that function hello
6:49:39
here's the test here is the actual code would this test now
6:49:45
work any thoughts uh I think the problem is that in the first version in
6:49:50
hello.py you're using the toe argument that you first declare when you declare
6:49:56
the function instead of using the name okay I that is actually uh not a
6:50:03
bug here so let me stipulate that in hello.py this code actually does work as intended and let me go ahead and test it
6:50:09
manually just to demonstrate as much let me run python of hello.py typing in as
6:50:14
my name David and I see in fact that it says hello David if though I were to change this program and get rid of the
6:50:21
name argument get rid of the name variable and just call hello again running python of hello.py this time I'm
6:50:28
not even prompted because I got rid of my input call but it does pre behave as I expect it does say hello world so let
6:50:35
me stipulate that this code in its current form is actually correct but my
6:50:41
test is not going to work as I'd hoped and there's a subtle difference between hello versus my pow function that expl
6:50:48
versus my there's a subtle difference between my hello function and my Square function that
6:50:54
explains why might this test not work as intended um because it's not returning a
6:51:00
value yeah exactly recall our discussion early on about functions functions can either return a value like my Square
6:51:07
function hands you back the square of some value or they can have side effects sort of visual uh artifacts that might
6:51:13
happen on the screen like printing something out on the screen and by definition that's how Print Works notice
6:51:19
that hello it is short but it's implemented ultimately using the print function which does not return a value
6:51:24
as I'm using it here it instead has this side effect of printing something onto the screen so it is not correct in my
6:51:30
test function to check if the return value of hello equals equals hello David
6:51:37
because again hello is not returning anything it's printing something with that side effect but notice literally it
6:51:43
has no return keyword unlike my Square function which did so here's an
6:51:48
opportunity too to perhaps change how I go about implementing my actual
6:51:53
functions it turns out that as your programs get more and more sophisticated more and more complicated it tends to be
6:52:00
best practiced not to have side effects if if you can avoid it especially if you want your code to be testable and in
6:52:06
fact I'm going to propose that we change my hello program to now work as follows let me go ahead and change this function
6:52:13
to not print hello and then that name let me go ahead and literally return
6:52:18
maybe an F string which will clean this up a little bit hello comma 2 close
6:52:24
quote at the end so my syntax here is just the familiar F string or format string it's going to return hello world
6:52:30
or hello David or hello whoever name is passed in as that argument but I'm returning it now I'm not printing it out
6:52:38
so what needs to change up here well I could do something like this I could say
6:52:43
something like output equals hello and then print output in my main function or
6:52:49
I can simplify that because I don't really need that variable I could instead just do this I could still call
6:52:55
hello but I could immediately print out the result and this version of my hello
6:53:00
program now is actually more test able why because these assert statements that we're using and we've seen th far for
6:53:06
our tests are really designed to test arguments into functions and return
6:53:13
values there from not testing side effects so if you're doing equals equals you're looking for a return value
6:53:18
something that's handed back from the function so that's fine if I modify the design of my program now not to just
6:53:24
print hello but to return the string the sentence the phrase that I want to
6:53:30
construct I can leave it to the caller that is the function who's using this hello function to handle the actual
6:53:36
printing now what does this mean in my code well it means now if my hello.py looks like this and hello is indeed
6:53:43
returning a value in my test hello function I can test it exactly like this
6:53:48
so let me go ahead and run Pi test of test hello.py crossing my fingers as always and voila one passed so I passed
6:53:56
this test because apparently the return value of hello does indeed equal hello comma David well let's test the scenario
6:54:03
what if I P call hello without any arguments let's assert that calling hello with nothing in those parentheses
6:54:10
similarly equals hello comma but world the default value let me now go ahead and run Pi test of test hello.py and
6:54:18
that too passes entirely but there too suppose that I had made some mistake suppose that there were a bug in my code
6:54:25
it might not be best practice to combine multiple tests in this one function so let's make it more clear what might pass
6:54:31
or fail let's call the first function test the default uh to this function and let's only include this first line of
6:54:37
code and then let's go ahead and Define another function like test argument to test this other line of code here so now
6:54:44
I have two different tests Each of which is testing something a little fundamentally different so now when I
6:54:49
run my code it's still not broken if I run Pi test of test hello.py enter I've
6:54:55
now passed two tests and that's just as good as before but if I did have a bug
6:55:00
having two tests instead of one would indeed give me perhaps a bit more of a hint as to what's wrong questions now on
6:55:09
this testing of return values when these return values are now strings instead of integers and why we've done this so my
6:55:16
question is uh about function inside the function uh can we test that too or
6:55:23
recursion we we we have't seen if you have if you have a recursive
6:55:29
function which we've not discussed in this class yes you can absolutely test those two uh by simply calling them
6:55:36
exactly in this way recursion does not affect this process all right how about one more question here on unit test before we look at one final example when
6:55:43
testing our uh arguments like uh can we use something like a Loops or inside of
6:55:52
assert or for the values absolutely you can absolutely use a loop to test multiple values in this case for
6:55:59
instance I could do something like this I could say for name in The Following
6:56:05
list of Hermione uh say Harry and Ron I could
6:56:11
then within this Loop assert that hello of that given name equals equals say the
6:56:18
format string of hello comma name and then run all of these here at once by
6:56:25
running again Pi test of test hello.py it's still going to be just one test within that function but if there's
6:56:31
something interesting about those several strings that makes it compelling to test all of them you can absolutely automate the tests in that way with that
6:56:39
said each of your test should ideally be pretty simple and pretty small why
6:56:44
because you don't want to write so much code so much complicated code that your tests might be flawed what we don't want
6:56:49
to have to do is write tests for our tests and tests for our test for our tests because it would never end so
6:56:54
keeping tests nice and simple is really the goal so that a reasonable human yourself included can eyeball them and
6:57:00
just claim yeah that is correct we don't need tests for our tests all right how
6:57:05
about one other feature suppose that we don't have just one test but many different tests instead and we want to start to organize those tests into
6:57:11
multiple files and even a folder well P test and other Frameworks support that Paradigm as well in fact let me go ahead
6:57:18
and test hello.py using a folder of tests with technically just one test but it would be representative of having
6:57:24
even more in that folder I'm going to go ahead and create a new folder called test using makeer at my command line and
6:57:31
then Within that file I'm within that and then within that folder I'm going to go ahead and create a file called test
6:57:38
hello.py within this file meanwhile I'm going to test the same things I'm going to go ahead and from Hello import
6:57:44
hello and I'm going to go ahead and Define a function like test default that
6:57:49
simply tests the scenario where hello with no arguments returns hello comma world and I'm going to have that other
6:57:56
function where I test that an argument is passed and in this case I'll choose an argument like asserting that hello
6:58:02
quote unquote David equals indeed hello comma not world but David So in this
6:58:08
case I've just recreated the same test as earlier but they're in a file now in a folder called test well P test allows
6:58:15
me to run these here too but to do so I actually need to create one other file within my test directory I need to
6:58:23
create a file called uncore uncore init uncore uncore dopy which has the effect
6:58:29
even if this file is empty of ing python to treat that folder as not just a
6:58:35
module but a package so to speak a package is a python module or multiple
6:58:41
modules that are organized inside of a folder and this file underscore uncore init underscore uncore Pi is just a
6:58:48
visual indicator to python that indeed it should treat that folder as a package if I had more code in this folder I
6:58:54
could do even more things with this file but for now it's just a cluee that it's indeed meant to be a package and not
6:58:59
just a module or file alone what I can now do in closing is run P test not even
6:59:05
on that specific file but on a whole folder of tests so if I run Pest of test
6:59:11
where the test is the name of that folder pest will automatically search through that folder looking for all
6:59:17
possible tests granted there's just those two in this one file but when I run it now with enter I'll still pass
6:59:24
those tests I'll still get 100% And I now have a mechanism ultimately for testing my own code so whether you're
6:59:30
writing functions that return integers or something else functions that have side effects that could be Rewritten as
6:59:35
functions that return values you now have a mechanism to not just wait for one someone like us to test your code
6:59:41
and not just test your code manually again and again which might get tedious and you might make mistakes by not including some possible inputs we now
6:59:48
have an automated mechanism for testing one's own code that's going to be even more powerful when you start
6:59:53
collaborating with others so that you can write tests that ensure that if they make a change to the same code they
6:59:59
haven't broken the code that you've written all right that's it for this week we'll see you next time