# Diagnoses Data Analysis

[![diagnosesDataAnalysis](https://raw.githubusercontent.com/JhonatanBarrera/DiagnosesDataAnalysis/master/img/diagnosesDataAnalysis1.PNG)]

This is a small visualization of data on diagnoses that aims to teach a vision that is useful in understanding population morbidity and that may be of help for decision makers. The diagnoses in Colombia are stored in the Individual Registries of Health Services Delivery - RIPS - and are codified under a standard, International Statistical Classification of Diseases and Related Health Problems -ICD- currently in its tenth version. This classification groups the diagnoses that can be presented in 3 groups, diagnoses for men, women and both genders. The data that I am going to use corresponds to a small sample of RIPS in which the fields corresponding to the sex of the person have been taken, an id that relates the different diagnoses that have been given on the same individual and the diagnoses, respectively. For each consultation there can be four diagnoses, one main and three secondaries. This data has been preprocessed to finally obtain a json file with which to perform the visualization.

When starting the visualization you can see a number of points and that represents each of the diagnoses in our json, these points can be taken as the nodes of a graph, in this, there is an edge between the diagnoses that have been presented for the same person, these edges allow us to see the relationship between diagnoses and the behavior of morbidity in the population, to activate this view we can select the option "Links", the nodes according to their repeated appearance in patients have a weight, which we can use to identify in the visualization in a simple way which are the most frequent diagnoses, this with the option "Node Strenght", in the same way the edges have a weight that allows us to identify more easily which are the diagnoses that are related with greater frequency, and that represent the dynamics that could be considered to prioritize in their attention. This can be seen with the option "Links Strenght", where the nodes connected with greater strength have a darker edge.

# Display Frame:
### What:
  - RIPS (Individual Registry of Provision of Health Services).
  - ICD-10 (International Statistical Classification of Diseases and Related Health Problems).

### Why:
  - Identify the diagnoses that occur most frequently.
  - Approximate the dynamics of population morbidity through the connections between diagnoses.
  - Find patterns of grouping between diagnoses.

### How:
  - Interested in knowing about the morbidity dynamics.

## Visit

  - [Tool] - Page of the site.
  - [Video] - Demonstration on video, in Spanish.
 
## Tech

The project makes use of:

* [D3.js] - JavaScript library for manipulating documents based on data.
* [Clustering.js] - Allows you to detect clusters in networks using the Clauset, Newman and Moore community detection algorithm directly from the browser

### Author

 - Jhonatan Barrera

License
----

MIT


**Free Software, Hell Yeah!**

   [D3.js]: <https://d3js.org/>
   [Clustering.js]: <https://github.com/john-guerra/netClusteringJs>
   [Tool]: <https://jhonatanbarrera.github.io/DiagnosesDataAnalysis>
   [Video]: <https://youtu.be/OX4epftnk8k>
