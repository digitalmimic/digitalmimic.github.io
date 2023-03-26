function showGraph() {
    if(document.getElementById('results-group').style.display=='none' || 
    (document.getElementById('results-sec-container').style.display=='none' && document.getElementById('results-eth-container').style.display=='none') || 
    document.getElementById('results-condition-container').style.display=='none' || 
    document.getElementById('results-intervention-container').style.display=='none') {
        return;
    }

    let graphString;
    if(document.getElementById('results-intervention').value=="none") {
        graphString = buildGraphString("sRandomWalk", ""); 
    } else if(document.getElementById('results-intervention').value=="payment") {
        graphString = buildGraphString("sRandomWalk", "VariableGas");
    } else if(document.getElementById('results-intervention').value=="advice") {
        graphString = buildGraphString("sMetaRandom", "");
    } else if(document.getElementById('results-intervention').value=="vaccinations") {
        graphString = buildGraphString("sRandomWalk", "VariableImmune");
    }
    document.getElementById('graph').innerHTML = graphString ? '<img class="graph center" src="images/graphs/' + graphString + '.png" onerror="document.getElementById(\'graph\').innerHTML=\'Please make another selection.\'; document.getElementById(\'results-context\').style.display = \'none\';" />' : document.getElementById('graph').innerHTML = '';
    document.getElementById('results-context').style.display =  graphString ? 'inline' : 'none';
}

function buildGraphString(prefix, suffix) {
    let seekers = [];
    for(checkbox of document.querySelectorAll("* input[type='checkbox']")) {
        if(checkbox.checked) seekers.push(prefix+checkbox.value+suffix);
    }
    seekers.sort();
    if(seekers.length==0) return null;
    return seekers.join('-') + '_' + document.getElementById('results-season').value;
}

document.addEventListener('DOMContentLoaded', function() {
    for(let image of document.querySelectorAll('.image-links img')) {
        image.addEventListener('mouseover', function (evt) {
            evt.target.style.opacity = 0.5;
        });
        image.addEventListener('mouseout', function (evt) {
            evt.target.style.opacity = 1;
        });
    };
    document.getElementById('results-season').addEventListener('change', function (evt) {
        showGraph();
        document.getElementById('results-group').disabled = false;
    });
    document.getElementById('results-group').addEventListener('change', function (evt) {
        showGraph();
        if(evt.target.value=='sec') {
            document.getElementById('results-eth-container').style.display = 'none';
            for(let check of document.querySelectorAll("#results-eth-container input[type='checkbox']")) check.checked = false;
            document.getElementById('results-sec-container').style.display = 'inline';
            showGraph();
        } else {
            document.getElementById('results-sec-container').style.display = 'none';
            for(let check of document.querySelectorAll("#results-sec-container input[type='checkbox']")) check.checked = false;
            document.getElementById('results-eth-container').style.display = 'inline';
            showGraph();
        }
        
    }); 
    for(check of document.querySelectorAll("* input[type='checkbox']")) {
        check.addEventListener('click', function (evt) {
            showGraph();
            document.getElementById('results-subgroup').disabled = false;
        });
    };
    document.getElementById('results-condition-container').addEventListener('change', function (evt) {
        showGraph();
        document.getElementById('results-intervention').disabled = false;
    });
    document.getElementById('results-intervention').addEventListener('change', function (evt) {
        showGraph();
    });
});
