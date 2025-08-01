---
title: "Probability Distributions Explained"
categories: ["computer-science", "programming"]
tags: ["probability", "statistics", "distributions", "data-science"]
tools: ["general"]
summary: "A clear explanation of common probability distributions, including when and how to use them in practical applications."
catchphrase: "Know your data's destiny."
draft: true
math: true
date: 2025-06-30
---

Probability distributions are a key concept in probability theory & statistics. They provide a way to model uncertainty & randomness; this can be applied to describing and analyzing data, making predictions, testing hypotheses using statistical inference, inform decision making in many fields, such as finance, engineering, and medicine, and many more applications.
In this Blog Article, we'll define concepts such as probability, discrete and continuous random variables, sample spaces, and events. We'll then define what is a probability distribution, and the types of distributions based on the random variables they describe. We'll complement each example by using R to generate plots for various types of distributions, sample from distributions, and make simple calculations.
We'll be using R scripts which can be found in the [Blog Article Repo](https://github.com/pabloagn/blog/tree/master/probability-and-statistics/probability-distributions-explained).

## Preparations

Before we dive into our main topics, we will make some preparations. We'll be working with R scripts for creating and plotting our distributions. If we're not familiar with R, we can consult the [R for Beginners](https://pabloagn.com/blog/r-for-beginners/) Blog post, where the basics of the language are reviewed in detail.
The first thing we'll do is create a new file for our project, called `main.R`. Once we have it, we will install and import the following modules:

```R
# Install required packages
install.packages('extrafont')
install.packages('ggplot2')
# Load packages
library(extrafont)
library(ggplot2)
library(glue)
```

Since we'll be using custom fonts for our visualizations, we will need to import and register them for Windows bitmap output. Keep in mind we must make sure we have the required fonts installed in our system; for this segment we'll be using the [Cardo](https://fonts.google.com/specimen/Cardo) family font, but any other family can be used provided it's installed.

```R
# Import fonts
font_import(paths = "C:/Users/yourusername/AppData/Local/MICROSOFT/Windows/Fonts")
# Register fonts for Windows bitmap output
loadfonts(device="win")
```

We will then define some parameters for our plots:

```R
# Set font parameters
my_font <- "Cardo"
size_title <- 18
size_labels <- 16
size_axis <- 13
margin_x <- margin(t = 20)
margin_y <- margin(r = 30)
title_just <- 0.5
title_padding <- margin(10, 0, 10, 0)
color_font_main <- "#1A1A1A"
color_font_light <- "#4A4A4A"
color_panel_bg <- "#ebebeb"
color_plot_bg <- "#F2F2F2"
# Set chart parameters
point_size = 2
# Set export parameters
article_code = "B015A032"
```

## Now that we have our environment ready, we can begin to discuss probability theory as a preamble to probability distributions.

## An introduction to probability theory

Probability is a measure of the likelihood or chance of an event occurring. It's a number between 0 and 1, where 0 represents an impossible event (_an event that cannot occur_), and 1 represents a certain event (_an event that will always occur_). For events that are neither impossible nor certain, the probability lies somewhere between 0 and 1.
It's important to note that a given probability cannot be higher than 1. Also, for any event or set of events, the sum of the probabilities of all possible outcomes must be equal to 1. This is known as the Law of Total Probability, and is a pilar in probability theory.
Let us imagine an experiment where we flip a coin $n$ times. A conventional coin has two sides: heads and tails. If the coin is fair (_we will talk about fair and unfair variables later on_), the probability of heads is the same as the probability of tails in a single toss. Thus, we have two possible events with one associated probability each:

- Heads: $p = 0.5$
- Tails: $p = 0.5$
  As we can see, the two probabilities sum up to 1, thus, the Law of Total Probability is fulfilled.
  No matter how many times we toss the coin, the probabilities of heads or tails will remain the same (_i.e., if we toss the coin 10 times, and we get heads each time, the next toss will have a probability of heads = 0.5, and tails = 0.5_). But we might think, why? Wouldn't a coin toss have higher probability to result in tails after 10 tosses resulting in heads? The answer is: no. This believe is known as the [gambler's fallacy](https://en.wikipedia.org/wiki/Gambler%27s_fallacy), as we'll see further on.
  As we saw in our previous example, probability is sometimes unintuitive; if this is our first approach to probabilistic experiments, we may think that probability theorems go against common sense. This is completely normal; our intuitions are often based on small samples or personal experiences, rather than on large datasets or objective evidence. Probability captures the entire frame, providing with powerful modeling and complex decision-making tools.
  The coin example includes only 2 possible events. However, our world is not build on black or white; this is where probability distributions come in place.

---

## Random variables, sample space, & events

before we dive into probability distributions, it's worth discussing some key concepts around probability theory:

- Random variables
- Sample space
- Probabilistic events

### Random variables

A **random variable** ($r.v.$) is a variable that takes on different values based on the outcome of a random event or experiment. In other words, it's a quantity that can have different possible values, and the value it takes depends on the outcome of some random process.
In our coin toss experiment, the random variable would be the outcome of the single coin toss.

#### Discrete random variables

A discrete random variable is a variable that can only take discrete values; takes on a finite or countably infinite set of distinct values.
But what do we mean by countable values? The outcome of a single coin toss can be represented as a discrete $r.v.$, since its possible values $\{\text{heads}, \text{tails}\}$ are finite and countable.
Another example of a discrete random variable would be the outcome of a 6-sided die, where we have six possible outcomes.

#### Continuous random variables

A continuous random variable is a variable that can take on an infinite number of possible values within a certain range or interval, and the probability of any particular value occurring is always zero.
Let us picture a dartboard in a cartesian coordinate system:
B016A033*dartboard_bg.png
\_Figure 1. Dart Board Denoting a continuous Probabilistic Space*
We have a set of outcomes limited by the circumference of our circle. What's interesting, is that the set of outcomes is infinite; we could in theory count the number of coordinate pairs, but if we had a dart thin enough, we could not do that, thus, the probability of a single event occurring (_i.e., the dart hitting a specific coordinate pair_), would be 0.

### Sample space

A **sample space** ($S$) is the set of all possible outcomes of the experiment or process, and is typically represented by a list, set, or other collection of values or symbols.
In our coin toss experiment, the sample space variable would be represented by $S = {A, B}$.

### Probabilistic events

A **probabilistic event** ($A$) is an event that has a certain level of uncertainty or randomness associated with it. In other words, it's an event that may or may not occur, and its outcome is not entirely predictable. An event can occur by performing a **probabilistic experiment**, in our case, flipping a coin.
The **probability of an event** is a measure of the likelihood or chance of that event occurring. As we mentioned, this probability is a number between 0 and 1, both inclusive. The probability of an event A can be expressed as such: $P(A)$.
In our coin toss example, the two possible events would be heads ($A$) or tails ($B$), which we could also denote as $\{1,0\}$.
These three concepts are the foundations of probabilistic theory, and key in understanding probability distributions.

---

## Probability distributions

Probability distributions are mathematical functions that describe the likelihood of different outcomes in a random event or experiment; they describe the possible values a random variable can take, and how frequently they occur.
Let us revisit the coin example, where we have two possible outcomes or events. In this experiment, we toss the coin once.
It would then make sense to express the set of 2 probabilities as such:

$$
  P(X=x) =
  \begin{cases}
    p     & \text{if $x = 1$}, \\
    1 - p & \text{if $x = 0$}.
  \end{cases}
$$

Where:

- $P(X=x)$ denotes the probability of the random variable $X$ taking the value $x$.
- $p$ is the Bernoulli parameter, which can also be thought of as the probability of success in a single coin toss, where the random variable $X = 1$.
- If we have two possible events, it would make sense to express the probability of failure as $1-p$, since we know that the entire sample space must sum to 1.
  The expression we just reviewed is called a **Probability Mass Function** (_PMF_).

### Probability distribution functions

Probability distribution functions are mathematical functions that describe the probability distribution of a random variable. There are different types of probability functions, depending on whether the random variable is discrete or continuous.
The two main probability distribution functions are:

- **PMF:** Probability Mass Function
- **PDF:** Probability Density Function
  However, we also have the CDF, which describes the cumulative probability of a $r.v.$ which can be either discrete or continuous.

#### PMF

A **Probability Mass Function** (_PMF_) is a function that describes the probability distribution of a discrete random variable. The PMF assigns a probability to each possible value that the random variable can take, and is used to calculate the probability of different events or combinations of events.
Let us revisit our die example, where we have one fair 6-sided dice. Since our dice has 6 sides and is fair, we can say that on a single die experiment, each side has the same probability (i.e., $\frac{1}{6}$).
Since we have the same probability for each number, a single die of a fair $n$-sided dice will always have a discrete uniform distribution. Thus, we can express its PMF as follows:

$$
\begin{equation}
p_{X}(x)=\begin{cases}
\dfrac{1}{n} & x \in \{1, 2, ..., n\} \\
0 & \text{otherwise}
\end{cases}
\end{equation}
$$

Where:

- $X$ is our discrete random variable.
- $x$ is a value that the dice can take.
- $n$ is the number of sides in our dice.

#### PDF

A **Probability Density Function** (_PDF_) (_not to be confused with Probability Distribution Functions_) is a function that describes the probability distribution of a continuous random variable. The PDF assigns a probability density to each possible value of the random variable, and is used to calculate the probability of different events or combinations of events.
Let us think of an example where we want to estimate the battery of our phone at a given point in time. We can assume that the actual battery life can be between a minimum and maximum value at a given time, with equal probability.

$$
\begin{equation}
f_{X}(x)=\begin{cases}
\dfrac{1}{b-a} & a \leq x \leq b \\
0 & \text{otherwise}
\end{cases}
\end{equation}
$$

Where:

- $X$ is our battery life as a random variable.
- $x$ is a value that the battery can take with a given probability, at a given point in time.
- $b$ is the upper limit of the battery life.
- $a$ is the lower limit of the battery life.
  We mentioned that the probability for a single point in a continuous distribution is always 0. Because of this, we define our PDF in terms of endpoints of the interval over which the uniform distribution is defined.
  If we think of it in practical terms, the probability of our battery being exactly $77.983274\%$ can be considered $0$. However, the probability of our battery life being between $77\%$ and $78\%$, can be calculated using the PDF we just defined.

#### CDF

A **Cumulative Distribution Function** (_CDF_) is a function that describes the probability distribution of a random variable, either discrete or continuous. A CDF gives the probability that the random variable $X$ takes on a value less than or equal to a given value $x$.

$$
\begin{equation}
F_{X}(x)=\begin{cases}
0 & x < a \\
\dfrac{x-a}{b-a} & a \leq x \leq b \\
1 & x > b
\end{cases}
\end{equation}
$$

Where:

- $X$ is our continuous random variable.
- $x$ is a value that the dice can take.
- $b$ is the upper limit of our segment.
- $a$ is the lower limit of our segment.
  Let us refer back to our single die of a 6-sided dice example. We know that each side has a probability of $\frac{1}{6}$.
  If we want to calculate the probability of a given die resulting in 4 or less, we can say that:
  $$P(X\leq4)=P(X=1)+P(X=2)+P(X=3)+P(X=4)$$
  $$P(X\leq4)=\frac{2}{3}$$
  We can plot a CDF by calculating the cumulative sum of all probabilities, from 1 to 6:

```R
# Define the possible outcomes
x <- 1:6
# Define the probabilities of each outcome
fx <- rep(1/6, 6)
# Calculate the cumulative probabilities
Fx <- cumsum(fx)
# Create the data frame
df <- data.frame(x = x, Fx = Fx)
# Create the CDF plot
ggplot(df, aes(x = x, y = Fx)) +
  geom_step() +
  geom_point(size = point_size) +
  labs(title = "CDF of a 6-sided dice roll",
       x = "Outcome",
       y = "Cumulative Probability") +
  theme(plot.title = element_text(family = my_font, size = size_title, hjust = title_just, margin = title_padding, color = color_font_main),
        axis.title.x = element_text(family = my_font, size = size_labels, margin = margin_x, color = color_font_main),
        axis.title.y = element_text(family = my_font, size = size_labels, margin = margin_y, color = color_font_main),
        axis.text = element_text(family = my_font, size = size_axis, color = color_font_light),
        panel.background = element_rect(fill = color_panel_bg, colour = NA),
        plot.background = element_rect(fill = "transparent", colour = NA)) +
  scale_y_continuous(limits = c(0, 1)) +
  scale_x_continuous(breaks = x)
```

<p align="center">
  <img src="https://pabloagn.com/wp-content/uploads/2023/04/B015A032_plot1_bg.png">
</p>
_Figure 1: CDF of a Discrete Uniform $r.v.$_
We can see that for each step, the probability increases by $\frac{1}{6}$, or $16\%$.
### Types of distributions
There are multiple probability distributions depending on the random variables we're trying to describe. In the coin toss example, we introduced the Bernoulli distribution, which describes the probability of achieving a “success” or “failure” from a Bernoulli trial. A Bernoulli trial is an event that has only two possible outcomes (_success or failure_).
This means that we can classify the probability distributions by the quantifiable nature of the $r.v.$:
- Discrete distributions
- Continuous distributions
The Bernoulli distribution is discrete by nature, since there are only two possible outcomes we can count. However, there are distributions for all kinds of experiments:
- Bernoulli distribution
- Binomial distribution
- Poisson distribution
- Geometric distribution
- Negative binomial distribution
- Uniform distribution
- Normal (_or Gaussian_) distribution
- Exponential distribution
- Gamma distribution
- Beta distribution
- Student's t-distribution
- Chi-squared distribution
- F-distribution
- Weibull distribution
- Logistic distribution
- Pareto distribution
- Log-normal distribution
In this segment, we'll exclusively focus on the most relevant:
- Bernoulli distribution
- Binomial distribution
- Poisson distribution
- Geometric distribution
- Uniform distribution
- Normal (_Gaussian_) distribution
- Exponential distribution
### Discrete distributions
As we mentioned, a discrete random variable is one that can only take a finite or countably infinite set of distinct values.
It then makes sense to define a discrete distribution as probability distributions that describe the probability of each possible outcome of a random variable that can only take on a countable number of distinct values.
There are infinitely many possible discrete probability distributions depending on the behavior of the random variable we're modeling. If we narrow down, there are about 8 to 10 main discrete distributions (_the ones that are most commonly used and reported in literature_). However, in this segment we'll only stick to describing 4 of them.
#### Bernoulli distribution
The **Bernoulli distribution**, named after Swiss mathematician [Jacob Bernoulli](https://en.wikipedia.org/wiki/Jacob_Bernoulli), describes the outcome of a single binary random event or experiment, such as flipping a coin or the success or failure of a single trial in a series of trials.
The Bernoulli distribution has only two possible outcomes, typically labeled as $1$ for success and $0$ for failure, with a probability of success denoted as $p$. This type of event (_i.e., where we have only two possible outcomes_) is also called a [Bernoulli or Binomial trial](https://en.wikipedia.org/wiki/Bernoulli_trial), where the success of the trial is denoted by a given random variable (_e.g., Heads in a coin flip_).
Any situation where there are only two possible outcomes can be modeled by a Bernoulli distribution. Some examples include:
- **Flipping a coin:** Heads or tails.
- **Voter preference:** Support or not support a candidate.
- **Product defects:** Defective or non-defective product.
- **Medical diagnosis:** Disease or no disease.
- **Stock market trend:** Positive or negative.
- **Sports game outcome:** Win or loss.
##### PMF
The PMF of the Bernoulli distribution is extremely simple, and can be expressed as follows:
$$
\begin{equation}
p_{X}(x)=\begin{cases}
p & \text{if } \ x = 1 \\
1-p & \text{if } \ x = 0
\end{cases}
\end{equation}
$$
Where:
- $X$ is our discrete random variable.
- $x$ is a value that our random variable can take.
- $p$ is the probability of success.
We can also express its PMF as follows:
$$p_{X}(x)=p^{x}(1-p)^{1-x}$$
The PMF plot for the Bernoulli distribution is also very simple. We can plot a PMF for $p=0.5$ by using the following syntax:
```R
# Set the success probability
p <- 0.5
# Create a data frame with the possible outcomes and their probabilities
data <- data.frame(outcome = c(0, 1), probability = dbinom(c(0, 1), size = 1, prob = p))
# Plot the PMF using ggplot2
ggplot(data, aes(x = outcome, y = probability)) +
  geom_col(fill = color_font_main, width = 0.5) +
  scale_x_continuous(breaks = c(0, 1), labels = c("0", "1")) +
  labs(title = glue("Bernoulli Distribution with p = {p}"),
       x = "Outcome",
       y = "Probability") +
  theme(plot.title = element_text(family = my_font, size = size_title, hjust = title_just, margin = title_padding, color = color_font_main),
        axis.title.x = element_text(family = my_font, size = size_labels, margin = margin_x, color = color_font_main),
        axis.title.y = element_text(family = my_font, size = size_labels, margin = margin_y, color = color_font_main),
        axis.text = element_text(family = my_font, size = size_axis, color = color_font_light),
        panel.background = element_rect(fill = color_panel_bg, colour = NA),
        plot.background = element_rect(fill = color_plot_bg, colour = NA)) +
  scale_y_continuous(limits = c(0, 1))
```
<p align="center">
  <img src="https://pabloagn.com/wp-content/uploads/2023/04/B015A032_plot2_bg.png">
</p>
As we can see, both outcomes (_success & failure_) have the same probability $p=0.5$.
##### Simulating Bernoulli trials
Let us think of an example where we have a fair coin (_i.e., the probability of heads and tails is the same_). In such case, we would have that $p=0.5$, such that $1-p=0.5$.
We can then simulate n number of Bernoulli trials by using the `rbinom` function:
```R
# Set the success probability and number of trials
p <- 0.5
n <- 10
# Simulate a Bernoulli trial with n trials and success probability p
outcome <- rbinom(n, size = 1, prob = p)
# Print the outcome of the n trials
print(outcome)
```
```
[1] 1 1 0 1 0 0 1 0 0 0
```
We can calculate the percentage of successes & failures for our 10 trials:
```R
# Calculate percentage of successes and failures
num_successes <- sum(outcome)
num_failures <- n - num_successes
perc_successes <- num_successes / n
perc_failures <- num_failures / n
# Print percentages
cat("Success Percentage: ",
    perc_successes,
    "\nFailure Percentage: ",
    perc_failures)
```
```
Success Percentage:  0.4
Failure Percentage:  0.6
```
But wait, didn't we say that if we simulated Bernoulli trials for a fair coin, we would get exactly $50\%$ probability for success and failure? Yes, that is true. However, here's where a key concept in probability theory called the [Law of Large Numbers]() comes in place; it states that if we repeat an experiment independently a large number of times and then average the result, what we obtain should be close to the expected value (_the mean_).
So, in theory, if we increase the number of trials, the result should get closer to what we expect:
```R
# Set the success probability and number of trials
p <- 0.5
n <- 1000
# Simulate a Bernoulli trial with n trials and success probability p
outcome <- rbinom(n, size = 1, prob = p)
# Print the outcome of the n trials
print(outcome)
# Calculate percentage of successes and failures
num_successes <- sum(outcome)
num_failures <- n - num_successes
perc_successes <- num_successes / n
perc_failures <- num_failures / n
# Print percentages
cat("Success Percentage: ",
    perc_successes,
    "\nFailure Percentage: ",
    perc_failures)
```
```
Success Percentage:  0.472
Failure Percentage:  0.528
```
We can see that the numbers are closer to $50\%$. Let us increase the number of trials to 1M:
```R
# Set the success probability and number of trials
p <- 0.5
n <- 1000000
# Simulate a Bernoulli trial with n trials and success probability p
outcome <- rbinom(n, size = 1, prob = p)
# Print the outcome of the n trials
print(outcome)
# Calculate percentage of successes and failures
num_successes <- sum(outcome)
num_failures <- n - num_successes
perc_successes <- num_successes / n
perc_failures <- num_failures / n
# Print percentages
cat("Success Percentage: ",
    perc_successes,
    "\nFailure Percentage: ",
    perc_failures)
```
```
Success Percentage:  0.500438
Failure Percentage:  0.499562
```
And as expected, we get an even closer result. We can repeat this procedure as many times as we'd like. However, our result will never converge to $p==50\%$; for this to happen, we would need to perform an infinite number of trials.
#### Binomial distribution
The Binomial distribution is very similar to the Bernoulli distribution. In fact, it builds on the latter, the main difference being that in the Binomial, we model the likelihood of observing a certain outcome when performing a series of tests for which there are only two possible outcomes (_i.e., a Bernoulli trial_).
##### PMF
The PMF of the Binomial distribution can be expressed as follows:
$$
\begin{equation}
p_{X}(x)=\begin{cases}
\binom{n}{k} p^k (1-p)^{n-k} & \text{if } \ x = 0, 1, 2, \ldots ,n \\
 & \text{otherwise}
\end{cases}
\end{equation}
$$
Where:
- $\binom{n}{k}$, also known as $n$ choose $k$, is the binomial coefficient, which represents the number of ways to choose $k$ successes from $n$ trials.
- $p$ is the probability of success on any given trial.
- $k$ is a non-negative integer less than or equal to n.
We can plot a Binomial distribution PMF using the following syntax:
```R
```
##### Simulating a Binomial distribution
### Discrete uniform distribution
6-sided dice single die.
##### PMF
##### Simulating a discrete uniform distribution
#### Poisson distribution
##### PMF
##### Simulating a Poisson distribution
#### Geometric distribution
Number of trials until 1 head appears.
##### PMF
##### Simulating a geometric distribution
### Continuous distributions
In contrast to discrete distributions, continuous distributions are probability distributions that describe the probability of each possible outcome of a random variable that can take on any value within a certain range or interval.
There are infinitely many possible continuous probability distributions, and about 8 to 10 main distributions. However, in this segment we'll study the 3 most important.
#### Continuous uniform distribution
The continuous uniform distribution follows the same principle as its discrete counterpart, with some differences.
##### PDF
##### Simulating a continuous uniform distribution
#### Normal (_Gaussian_) distribution
The normal distribution, also named Gaussian distribution after the German mathematician [Johann Carl Friedrich Gauss](https://en.wikipedia.org/wiki/Carl_Friedrich_Gauss), is probably the most used distribution for modeling real-world events. This is because many natural phenomena follow a normal distribution, such as the heights of people, the lengths of flower petals, and the weights of fruits.
Also, the normal distribution has a wide variety of characteristics that makes it extremely useful in statistical modeling:
- It's symmetric around the mean.
- It's unimodal.
- It has a well-defined mean and variance.
- The [central limit theorem](https://sphweb.bumc.bu.edu/otlt/mph-modules/bs/bs704_probability/BS704_Probability12.html) (_CLT_) states that the sum or average of a large number of independent and identically distributed random variables with finite mean and variance will tend towards a normal distribution, regardless of the underlying distribution.
- Many distributions can be approximated to a normal distribution by using the CLT.
##### PDF
The PDF of the normal distribution is extremely interesting, and has transcended to become an icon in mathematics & statistics, just as Einstein's Einstein's equation of relativity became in physics.
In fact, we have probably already seen its graphical representation, even if this is our first approach to probability theory. The normal distribution is represented by its characteristic bell-like shape.
##### Simulating a normal distribution
#### Exponential distribution
##### PDF
##### Simulating an exponential distribution
---
## Conclusions
We've reviewed multiple yet simple mechanisms we can employ to make our code cleaner, more elegant, modular, usable, scalable and safer. These measures can not only help us become better programmers but better collaborators. It will make reading code a pleasure instead of an agonizing process and instantly boost our credibility.
---
## References
- [Python Documentation, Built-in Exceptions](https://docs.python.org/3/library/exceptions.html)
- [Python Documentation, Errors & Exceptions](https://docs.python.org/3/tutorial/errors.html)
- [Towards Data Science, What happens when you import a Python module?](https://towardsdatascience.com/what-happens-when-you-import-a-python-module-ad6c0efd2640)
- [Towards Data Science, 3 data structures for faster Python Lists](https://towardsdatascience.com/3-data-structures-for-faster-python-lists-f29a7e9c2f92)
