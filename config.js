var config = {
    style: 'mapbox://styles/zoeyzhu/ck8d75c283p0j1itmy7uhufsn',
    accessToken: 'pk.eyJ1Ijoiem9leXpodSIsImEiOiJjazF2bGNzNmQwaWl1M2NxZ3kxNGJodDgxIn0.tDIH5cVr0SlDHxl6O4t4bA',
    showMarkers: false,
    theme: 'light',
    alignment: 'center',
    title: '',
    subtitle: '',
    byline:'' ,
    footer: '',
    chapters: [
        
        {
            id: 'ct_1',
            alignment:'Chinatown',
            title: 'Chinatown 1700',
            theme: 'black',
            size:'15px',
            alignment:'center',
            image: '',
            description: 'American Chinatown and its development derived from the flourishing of Chinese im- migrants bringing with their culinary and tra- ditional culture.</b>It is in the 1790s, when the first immigrants group emergent in the North America, that Chinese immigrants stepped on the stage of western migration history. ',
            location: {

                center: [1, 39.97790],
                zoom: 1.5,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'chinatown_1700',
                    opacity: 0.5
                }
            ],
            onChapterExit: [
                {
                    layer: 'chinatown_1700',
                    opacity: 0
                }
            ]
        },
        {
            id: 'ct_2',
            alignment:'center',
            title: 'Chinatown 1800',
            theme: 'light',
            size:'15px',
            alignment:'center',
            image: '',
            description: 'The following 1850s witnessed the flooding Chinese labors from Pearl Delta River district heading for the California Golden Rush. In the 1860s, after the mania of gold going down, most of the labors found niches in the transcontinental railroad industry and agriculture. Not only has they brought supportive labor force for the nationwide mechanized transportation networks, which totally revolutionized the economic and demographic structure of west America, but also subverted the eating culture of Americans since they harnesses their fishery and agricultural experience to bring more ingredients onto American’s ta- ble. This phenomena directly contribute the to the emergence of Chinese group. With increasing number of Chinese immigrants and economic opportunities, Chinatown emerged.',
            location: {

                center: [1, 39.97790],
                zoom: 1.5,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'chinatown_1800',
                    opacity: 0.7
                }
            ],
            onChapterExit: [
                {
                    layer: 'chinatown_1800',
                    opacity: 0
                }
            ]
        },

        {
            id: 'ct_3',
            alignment:'center',
            title: 'Chinatown 1900',
            theme: 'light',
            size:'15px',
            alignment:'center',
            image: '',
            description: 'Tracing back the story behind Chinatown, the first North American Chinese settlement was established in San Francisco, which served as a gateway for early Chinese immigrants from 1850s to 1900s. Initially, the purposes of Chinese immigrants , consisting of labors from Pearl River Delta, were the result of chances including California Gold Rush and Trans-continental Railroad . With the expansion and economic increasing, Chinatowns were founded in several big cities in North America including Los Angeles, New York, Vancouver and Boston. On the one hand, Chinatown has provided a harbor for Chinese Americans to support themself with help from neighborhood, on the other hand, Chinatown is where they can grab the food and merchandises from Far East.',
            location: {

                center: [1, 39.97790],
                zoom: 1.5,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'chinatown_1900',
                    opacity: 0.5
                }
            ],
            onChapterExit: [
                {
                    layer: 'chinatown_1900',
                    opacity: 0
                }
            ]
        },


        {
            id: 'world',
            alignment:'center',
            title: 'Chinese Cuisine',
            theme: 'light',
            size:'15px',
            alignment:'center',
            image: 'pic/chinacuisine-02.png',
            description: 'There are 8 main regional dishes in China territory, ranging from speicy ;Chuang’to ‘Sour-Sweet’Yue’.Original Chinese dishes are preferred by  the first generations and food Neophyllics.',
            location: {

                center: [103.33331, 35.12050],
                zoom: 4,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: '',
                    opacity: 0.8
                }
            ],
            onChapterExit: [
                {
                    layer: 'phl-city-limits',
                    opacity: 0
                }
            ]
        },



     
        {
            id: 'China',
            title: 'The spreading of Chinese Cuisine',
            image: 'pic/cuisine-03.png',
            description: 'This steep, rocky gorge can be surprisingly technical. Follow the orange and yellow trails to repeatedly climb and descend through the schist hillsides (careful of the cliffs), or stick to the gravel Forbidden Drive for a relaxing ride along the creek. You\'ll forget you\'re in a city.',
            location: {
                center: [103.33331, 35.12050],
                zoom: 4,
                pitch: 0.00,
                bearing:0.00
            },
            onChapterEnter: [
                {
                    layer: 'wissahickon',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'wissahickon',
                    opacity: 0
                }
            ]
        },

        {
            id: 'US',
            title: 'Chinese American Cuisine',
            image: 'pic/cuisine-04.png',
            showMarkers: true,
            description: 'Chinese-American Cuisine is built by American Chinese from 1924. These  new style of Chinese cuisine used readily available ingredients differing from traditional Chinese dishes. Frying, Choping and Grilling were the most common cooking techniques kept in A-C cookings.',
            location: {
                center: [-85, 40],
                zoom: 3.5,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'chinatown_1900',
                    opacity: 0.7
                }
            ],
            onChapterExit: [
                {
                    layer: 'chinatown_1900',
                    opacity: 0
                }
            ]
        },

     

        {
            id: 'sf',
            title: 'Chinatown in San Fransisco',
            image: 'pic/immigration-01.png',
            showMarkers: true,
            description: 'The Chinatown in San Francisco is the oldest Chinatown in North America and the largest Chinese enclave outside Asia. It is also the oldest and largest of the four notable Chinese enclaves within San Francisco.Since its establishment in 1848, it has been highly important and influential in the history and culture of ethnic Chinese immigrants in North America. Chinatown is an enclave that continues to retain its own customs, languages, places of worship, social clubs, and identity. There are two hospitals, several parks and squares, numerous churches, a post office, and other infrastructure. ',
            location: {
                center: [-122.41639, 37.79370],
                zoom: 13.08,
                pitch: 47.50,
                bearing: 32.80
            },
            onChapterEnter: [
                {
                    layer: 'chinatown_1900',
                    opacity: 0.7
                }
            ],
            onChapterExit: [
                {
                    layer: 'chinatown_1900',
                    opacity: 0
                }
            ]
        },

        {
            id: 'NYC',
            title: 'Chinatown in New York City',
            image: '',
            showMarkers: true,
            description: 'Manhattan"s Chinatown is a neighborhood in Lower Manhattan, New York City, bordering the Lower East Side to its east, Little Italy to its north, Civic Center to its south, and Tribeca to its west. With an estimated population of 90,000 to 100,000 people, Chinatown is home to the highest concentration of Chinese people in the Western Hemisphere. Manhattan"s Chinatown is also one of the oldest Chinese ethnic enclaves.The Manhattan Chinatown is one of nine Chinatown neighborhoods in New York City, as well as one of twelve in the New York metropolitan area, which contains the largest ethnic Chinese population outside of Asia, comprising an estimated 893,697 uniracial individuals as of 2017.',
            location: {
                center: [-73.99757, 40.71659],
                zoom: 13,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'chinatown_1900',
                    opacity: 0.7
                }
            ],
            onChapterExit: [
                {
                    layer: 'chinatown_1900',
                    opacity: 0
                }
            ]
        },
        
        {
            id: 'restaurant_03',
            title: 'Boston Chinatown',
            image: '',
            description: 'Chinatown, Boston is a neighborhood located in downtown Boston, Massachusetts. It is the only surviving historic ethnic Chinese enclave in New England since the demise of the Chinatowns in Providence, Rhode Island and Portland, Maine after the 1950s. Because of the high population of Asians and Asian Americans living in this area of Boston, there is an abundance of Chinese and Vietnamese restaurants located in Chinatown. It is one of the most densely populated residential areas in Boston and serves as the largest center of its East Asian and Southeast Asian cultural life. ',
            location: {
                center: [-71.05712, 42.35728],
                zoom: 14.08,
                pitch: 47.50,
                bearing: 32.80
            },
            onChapterEnter: [
                {
                    layer: 'chinese',
            
                    opacity: 0.7
                }
            ],
            onChapterExit: [
                {
                    layer: 'chinese',
                    opacity: 0
                }
            ]
        },
        
        {
            id: 'restaurant_03',
            title: 'Disppaering Chinatown Restaurant？',
            image: '',
            description: 'Filled with Chinese culture, including street vendor and people playing games under the Pagoda, today’s Chinatowns are still good places for both locals and visitors to experience Chinese food and culture in America. While there is a big controversy over decades due to the development of gentrification and the giant changing in real estate markets, the nostalgia stories behind Chinatowns have never gone away.',
            location: {
                center: [-71.05712, 42.35728],
                zoom: 14.08,
                pitch: 47.50,
                bearing: 32.80
            },
            onChapterEnter: [
                {
                    layer: 'cuisine',
            
                    opacity: 0.7
                }
            ],
            onChapterExit: [
                {
                    layer: 'cuisine',
                    opacity: 0
                }
            ]
        },

        {
            id: 'Check The Popular Restaurant',
            title: 'Check The Popular Restaurant',
            image: '',
            description: 'Therefore, several questions arouse, what is the next generation of Chinatown’s industry? what will happen in the city Boston with the gradual disappearance of Chinatown? Will the waste and transportation system be influenced with the gentrification of Chinatown ? What can government and community do to maintain the identity of Chinatown ? ',
            
            location: {
                center: [-71.05730, 42.35100],
                zoom: 15,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'restaurant',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    layer: 'restaurant',
                    opacity: 0.5
                }
            ]
        }
    ]
};
