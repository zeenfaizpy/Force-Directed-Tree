am4core.ready(function() {

    var source = document.getElementById("our-template").innerHTML;
    var template = Handlebars.compile(source);


    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chart_div", am4plugins_forceDirected.ForceDirectedTree);

    var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

    chart.data = [{
        "name": "Core",
        "children": [{
            "name": "CHILD",
            "children": [{
                "name": "A",
                "children": [{
                        "name": "12",
                        "value": 1
                    },
                    {
                        "name": "2",
                        "value": 1
                    }
                ]
            }, {
                "name": "C",
                "children": [{
                    "name": "9",
                    "value": 1
                }, {
                    "name": "11",
                    "value": 1
                }, {
                    "name": "3",
                    "value": 1
                }, {
                    "name": "6",
                    "value": 1
                }]
            }, {
                "name": "B",
                "children": [{
                    "name": "1",
                    "value": 1
                }, {
                    "name": "10",
                    "value": 1
                }]
            }, {
                "name": "E",
                "children": [{
                    "name": "13",
                    "value": 1
                }, {
                    "name": "5",
                    "value": 1
                }]
            }, {
                "name": "D",
                "children": [{
                    "name": "4",
                    "value": 1
                }]
            }, {
                "name": "F",
                "children": [{
                    "name": "8",
                    "value": 1
                }, {
                    "name": "7",
                    "value": 1
                }]
            }]
        }]
    }]

    networkSeries.nodes.template.expandAll = false;

    networkSeries.dataFields.value = "value";
    networkSeries.dataFields.name = "name";
    networkSeries.dataFields.children = "children";
    networkSeries.nodes.template.tooltipText = "{name}:{value}";
    networkSeries.nodes.template.fillOpacity = 1;
    networkSeries.maxLevels = 1;
    networkSeries.nodes.template.label.text = "{name}"
    networkSeries.fontSize = 16;
    networkSeries.dataFields.collapsed = "true";
    networkSeries.links.template.strokeWidth = 1;

    var hoverState = networkSeries.links.template.states.create("hover");
    hoverState.properties.strokeWidth = 3;
    hoverState.properties.strokeOpacity = 1;

    networkSeries.nodes.template.events.on("over", function(event) {
        event.target.dataItem.childLinks.each(function(link) {
            link.isHover = true;
        })
        if (event.target.dataItem.parentLink) {
            event.target.dataItem.parentLink.isHover = true;
        }

    })


    networkSeries.nodes.template.events.on("hit", function(event) {
        if (event.target.dataItem.depth === 2) {
            // var child_list = event.target.dataItem.children.first;
            //console.log(event.target.dataItem.children.values)
            // window.alert(child_list);

            //console.log(event.target.dataItem.dataContext);

            var data = event.target.dataItem.dataContext;

            var html = template(data);
            document.getElementById("chart_results").innerHTML = html;

        }
    })

    networkSeries.nodes.template.events.on("out", function(event) {
        event.target.dataItem.childLinks.each(function(link) {
            link.isHover = false;
        })
        if (event.target.dataItem.parentLink) {
            event.target.dataItem.parentLink.isHover = false;
        }
    })

});
