# Chinatown Story
design rationale
We want to provide the users an opportunity to better know food industry of the Chinatown and its neighborhood near downtown Boston. At this point, we want to show some information that may be already available on Google or Yelp’s App, then add our own research and analysis of these dataset we are using (also combined with the Ssaki Chinatown project ）
1.	How did you choose your particular visual encodings, interaction, and animation techniques? 
We use Leaflet.js and Mapbox’s API to embody the coordinates onto a web-based map. We were to give a general impression of Chinatowns all over the world then move to our focus on Boston Area. The map can also be altered from 2D top view to a 3D perspective view, through slide down from upper pages to lower pages, with our re-designed template for visual style. We added filters like Price, Rating, Cuisine Code and Credit Score, to let user decide which markers to show up according to their purpose or demand. Lastly, we have an analytic chart/graph, created by d3.js, to show the discrete point that represent each company mainly based on their customers’ rating and the number of viewers(customers), but also include other information that related to the companies themselves.
2.	What alternatives did you consider and how did you arrive at your ultimate choices?

One design about the interactive map is that we were considering weather use popup windows to show the detailed information when the user’s mouse hover on a marker, while, we eventually choose to use the side panel to present these information by user clicking the marker. We believe in this way the layout is more user friendly and the panel would not just disappear if they want to point on the information in the panel 

