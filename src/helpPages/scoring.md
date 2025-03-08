# :mahjong: Scoring Help :mahjong:

## Ruleset

All hands on this site have been extracted from Tenhou game logs, so the rules used on this site use Tenhou's ruleset.

## Site Options

A brief overview of the different options on the site: 

- `Test Han` - When disabled, you aren't required to calculate Han.
- `Test Fu` - When disabled, you aren't required to calculate Fu.
- `Kiriage Mangan Mode` - When enabled, a 4 han and 30 fu hand, as well as a 3 han 60 fu hand, are considered a mangan hand.
- `Include Honba Sticks` - When enabled, an extra field will be added and you will need to calculate the total score including additional points from honba sticks.
- `Ignore Fu on Limit Hands` - When enabled, if a hand has 5 or more han then you won't get penalised for an incorrect Fu answer.

## Calculating Han

Han is the sum of the number of yaku (and their worth) added to the number of dora (ドラ) that are in your hand. 

If there are multiple winning arrangements of your hand then the arrangement with the highest point value is taken. 

Please note: This trainer does not have any yakuman examples due to them being too easy.

See below a guide of how much each Yaku is worth:

### Yaku List

Below is a list of all the possible yaku available (excluding ones not available in this trainer) and their yaku scores. The first value is for an open hand, and the second closed. The symbol - means that the yaku is not possible with an open hand. 

**Examples**

[-/1] Not possible if open, 1 han is closed  
[2/3] Two han is open, 3 han if closed

#### Riichi [-/1]

Win after calling riichi. 

*This will be indicated in the info panel*

#### Menzen Tsumo [-/1]

Win by self-draw with a closed hand.

*Tsumo will show in the info panel, but this is only a yaku in a closed hand*

#### Tanyao [1/1]

Win with only number tiles and no terminals (1,9) or honour tiles.

^^234666s45688p567m^^

#### Pinfu [-/1]

Win with a hand that consists of only straights and a pair without using yaku tiles. Must be waiting to complete a straight on either side.

^^123s12345688p567m^^

#### Pure Double Chi [-/1]

Win with two identical straights of the same numbers in the same suit.

^^123123p^^

#### Dragon Triplet [1/1]

Win with a triplet (or kan) of dragon tiles

^^666h^^

#### Seat Wind Triplet [1/1]

Win with a triplet (or kan) of your seat wind tiles

^^111h^^

#### Round Wind Triplet [1/1]

Win with a triplet (or kan) of the round wind tiles

^^444h^^

#### Seven Pairs [-/2]

Win with 7 different pairs

^^22s223388p66m1166h^^

#### Triple Chi [1/2]

Win with the same straight in each suit.

^^123s123p123m^^

#### Pure Straight [1/2]

Win with three straights of the same suit. Forming 1,2,3 and 4,5,6 and 7,8,9.

^^123456789p^^

#### Outside Hand [1/2]

Win with all groups and the pair containing terminals or honour tiles

^^123s123999p123m11h^^

#### Triple Pon [2/2]

Win with three triplets of the same number in each suit

^^333s333p333m^^

#### Three Concealed Pon [2/2]

Win with three triplets, where the triplets are concealed (not taken by pon)

^^111s222p777m^^

#### Three Kan [2/2]

Win with three kan

^^3333s7777p5555m^^

#### All Triplets [2/2]

Win with four triplets (or kan) 

^^333s777p555m66677h^^

#### All Terminals and Honours [2/2]

Win with a hand that only uses terminals and honour tiles

^^111999s999p111m55h^^

#### Little Three Dragons [2/2]

Win with two dragon triples and a pair of dragon tiles

^^55566677h^^

#### Twice Pure Double Chi [-/3]

Win with two identical straights of the same numbers in the same suit

^^456456s123123p^^

#### Half Flush [2/3]

Win using only number tiles from one suit and honour tiles

^^123444666777s55h^^

#### Terminals in All Groups [2/3]

Win with a hand where each tile group has at least one terminal in it

^^111789s123p12399m^^

#### Full Flush [5/6]

Win using only number tiles from one suit

^^1233366677799s^^

### Dora

On top of the han you get for yaku, you get an additional han for each dora tile in your hand. 

A dora tile is the tile that is ordered one after the dora indicator tile. For example, if the dora indicator is `8s` then the dora tile is `9s` and you will get an additional han for each `9s` in your winning hand. 

#### Dragons

The dragon tile's order goes white -> green -> red  (You can remember this as alphabetical order)

^^567h^^

#### Winds

The wind tile's order goes east -> south -> west -> north (the same as the rotational order of a compass)

^^1234h^^


<br />

## Calculating Fu

### Win Type 

A winning hand is automatically awarded 20 fu to start with. 

If you have won by Tsumo, add an additional 2 fu.

If you have won by Ron, add an additional 10 fu. 

### Melds

Now you need to calculate the fu you get from your melds. (3+ of the same tiles)

|Condition | simple tiles | terminal or honor tiles
|---|--------------|------------------------
|An open triplet | 2 fu | 4 fu
|A closed triplet | 4 fu | 8 fu
|An open kan | 8 fu | 16 fu
|A closed kan | 16 fu | 32 fu

A simple way to remember this is: 

* Start with 2 fu per meld (a set of 3 or 4 matching tiles)
* For each meld:
    * If it's a terminal / honour, double your fu
    * If it's a closed meld, double your fu
    * If it's a kan, double your fu twice (or x4)

### Pairs

You get an additional +2 Fu if your pair is a: 

- Seat Wind
- Round Wind
- Dragon Tile

Note that if your pair is both the Seat Wind and Round Wind then that counts as +4 fu

### Winning wait

You get additional fu depending on the shape of your hand whilst waiting for your last tile. 

Simply: 

- If you are waiting on a single type of tile to complete your hand, +2 fu
- If you are waiting on 2 or more types of tiles to complete your hand, +0 fu

### Rounding

Finally round your fu score up to the next 10. 

*That means if you have 32 fu, you still round up to 40.*

This is your final fu score. 

### Exceptions

There are a couple of fu exceptions to learn:

- A Seven Pairs hand is always worth 25 fu (You do not round up)
- A Pinfu hand won by Tsumo is always 20 fu
- A Pinfu hand won by ron is always 30 fu

## Calculating Basic Points

First we'll go through how points are actually calculated. 

Initially we need to work out the basic points which you get using this function:

```latex
basic\ points = fu \times 2^{2+han}
```
<br />

## Mangans

When it is clear that your basic points calculation is over 2,000, it is limited to a basic point value of 2,000 and called mangan.

If your basic point calculation is below 2000, feel free to skip this section. 

As you get more han, it raises the value of a mangan. You can memorise the values from this table: 

|Name |Han Value| Basic Point Value
|:----:|:----:|:----:
|Mangan | 3 han, 70 fu or more <br> 4 han, 40 fu or more <br> 5 han | 2000 
|Haneman |6-7 han | 3000
|Baiman | 8-10 han | 4000
|Sanbaiman | 11-12 han | 6000
|Kazoe-yakuman | 13+ han | 8000

Now you have your basic point value you can move onto calculating the total points awarded.

## Calculating Total Points

Once the basic points are calculated, multiply them depending on the scenario. The four possible scenarios are:

* For a non-dealer tsumo, the dealer pays the winner $$2 \times basic\ points$$, and the other two players pay the winner $$1 \times basic\ points$$.
* For a dealer tsumo, all the three non-dealers pay the winner $$2 \times basic\ points$$.
* For a non-dealer ron, the discarding player pays the winner $$4 \times basic\ points$$.
* For a dealer ron, the discarding non-dealer pays the winner $$6 \times basic\ points$$.

Round **up** those points to the nearest 100. 

You now have a final score (or two) to input into the trainer. 

### (Optional) Honba Sticks

If you have the `Include Honba Sticks` setting turned on then you will also need to add additional points to that score. 
The number of point is calculated by multiplying 300 by the number of Honba Sticks there are. These are then divided up as per the rules above. 

<br />

## Scoring table

If you don't feel like doing some fairly serious mental arithmetic every time you're scoring, you can also use the point table: 

![Scoring Table](./img/riichi-scoring.webp)

Simply look up your han / fu values and it will give you the correct score. 
