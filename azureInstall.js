

function loadJSONConfig(){
	document.getElementById('subscriptionParametersTextarea').value = JSON.stringify(JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_SUBSCRIPTIONPARAMETERS').value), null, 1);
	
	document.getElementById('installationParametersTextarea').value = JSON.stringify(JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_INSTALLPARAMETERS').value), null, 1);
	
	document.getElementById('autoInstallerParametersTextarea').value = JSON.stringify(JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_AUTOINSTALLERPARAMETERS').value), null, 1);
}


function validateConfigAndParameters() {
	function diff2(a, b) {
		var i, la = a.length,
			lb = b.length,
			res = [];
		if (!la) return b;
		else if (!lb) return a;
		for (i = 0; i < la; i++) {
			if (b.indexOf(a[i]) === -1) res.push(a[i]);
		}
		return res;
	}
	
	var errorArray = [];
	
	var subscriptionParametersToObjectFlag = false;
	
	try{
	
		var subscriptionTextareaObject = JSON.parse(document.getElementById('subscriptionParametersTextarea').value);
		
		var subscriptionParametersToObjectFlag = true;
		
	} catch(err) {
	
		errorArray.push('Please ensure the "Subscription Parameters" text area contains valid JSON.');
	}
	
	if (subscriptionParametersToObjectFlag) {
	
			var subscriptionTextboxObject = JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_SUBSCRIPTIONPARAMETERS').value);
			
			var subscriptionTextboxObjectKeys = Object.keys(subscriptionTextboxObject);
			
			var subscriptionTextareaObjectKeys = Object.keys(subscriptionTextareaObject);
			
			var subscriptionKeysToAdd = diff2(subscriptionTextboxObjectKeys, subscriptionTextareaObjectKeys);
			
			var subscriptionKeysToRemove = diff2(subscriptionTextareaObjectKeys, subscriptionTextboxObjectKeys);
			
			for(subscriptionTextboxObjectKey in subscriptionTextboxObject){
			
				if(subscriptionTextareaObjectKeys.includes(subscriptionTextboxObjectKey)){
				
					if(typeof subscriptionTextareaObject[subscriptionTextboxObjectKey] != 'string'){
					
						errorArray.push('Please ensure "' + subscriptionTextboxObjectKey + '" is of type string.');

					}
				}
			}
			
			for(var subscriptionKeyToAdd in subscriptionKeysToAdd){
				
				errorArray.push('Please add a "' + subscriptionKeysToAdd[subscriptionKeyToAdd] + '" key pair value to the subscription parameters JSON. Keys are case sensitive.');
			}
			
			for(var subscriptionKeyToRemove in subscriptionKeysToRemove){
				
				errorArray.push('Please remove the "' + subscriptionKeysToRemove[subscriptionKeyToRemove] + '" key pair value from the subscription parameters JSON. Keys are case sensitive.');
			}
	}
	
	var autoInstallerParametersToObjectFlag = false;
	
	try{
	
		var autoInstallerTextareaObject = JSON.parse(document.getElementById('autoInstallerParametersTextarea').value);
		
		var autoInstallerParametersToObjectFlag = true;
		
	} catch(err) {
	
		errorArray.push('Please ensure the "Auto Installer Parameters" text area contains valid JSON.');
	}
	
	if (autoInstallerParametersToObjectFlag) {
	
			var autoInstallerTextboxObject = JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_AUTOINSTALLERPARAMETERS').value);
			
			var autoInstallerTextboxObjectKeys = Object.keys(autoInstallerTextboxObject);
			
			var autoInstallerTextareaObjectKeys = Object.keys(autoInstallerTextareaObject);
			
			var autoInstallerKeysToAdd = diff2(autoInstallerTextboxObjectKeys, autoInstallerTextareaObjectKeys);
			
			var autoInstallerKeysToRemove = diff2(autoInstallerTextareaObjectKeys, autoInstallerTextboxObjectKeys);
			
			for(autoInstallerTextboxObjectKey in autoInstallerTextboxObject){
			
				if(autoInstallerTextareaObjectKeys.includes(autoInstallerTextboxObjectKey)){
				
					if(typeof autoInstallerTextareaObject[autoInstallerTextboxObjectKey] != 'string'){
					
						errorArray.push('Please ensure "' + autoInstallerTextboxObjectKey + '" is of type string.');

					}
				}
			}
			
			for(var autoInstallerKeyToAdd in autoInstallerKeysToAdd){
				
				errorArray.push('Please add a "' + autoInstallerKeysToAdd[autoInstallerKeyToAdd] + '" key pair value to the auto installer parameters JSON. Keys are case sensitive.');
			}
			
			for(var autoInstallerKeyToRemove in autoInstallerKeysToRemove){
				
				errorArray.push('Please remove the "' + autoInstallerKeysToRemove[autoInstallerKeyToRemove] + '" key pair value from the auto installer parameters JSON. Keys are case sensitive.');
			}
	}
	
	var azureVMParametersToObjectFlag = false;
	
	try{
	
		var azureVMTextareaObject = JSON.parse(document.getElementById('installationParametersTextarea').value);
		
		var azureVMParametersToObjectFlag = true;
		
	} catch(err) {
	
		errorArray.push('Please ensure the "VM Installation Parameters" text area contains valid JSON.');
	}
	
	if (azureVMParametersToObjectFlag) {
			
		var azureVMTextboxObject = JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_INSTALLPARAMETERS').value);
		
		var azureVMTextboxTopLevelObjectKeys = Object.keys(azureVMTextboxObject);
		
		var azureVMTextareaTopLevelObjectKeys = Object.keys(azureVMTextareaObject);
		
		var azureVMTopLevelKeysToAdd = diff2(azureVMTextboxTopLevelObjectKeys, azureVMTextareaTopLevelObjectKeys);
		
		var azureVMTopLevelKeysToRemove = diff2(azureVMTextareaTopLevelObjectKeys, azureVMTextboxTopLevelObjectKeys);
		
		for(var azureVMTopLevelKeyToAdd in azureVMTopLevelKeysToAdd){
			
			errorArray.push('Please add a "' + azureVMTopLevelKeysToAdd[azureVMTopLevelKeyToAdd] + '" key pair value to the VM installation parameters JSON. Keys are case sensitive.');
		}
		
		for(var azureVMTopLevelKeyToRemove in azureVMTopLevelKeysToRemove){
			
			errorArray.push('Please remove the "' + azureVMTopLevelKeysToRemove[azureVMTopLevelKeyToRemove] + '" key pair value from the VM installation parameters JSON. Keys are case sensitive.');
		}
		
		if(typeof azureVMTextareaObject.contentVersion != "undefined" && azureVMTextareaObject.contentVersion !== azureVMTextboxObject.contentVersion){
			
			errorArray.push('Please esure the value of "contentVersion" of the VM installation parameters JSON is equal to "' + azureVMTextboxObject.contentVersion + '".');
		}
		
		if(typeof azureVMTextareaObject.$schema != "undefined" && azureVMTextareaObject.$schema !== azureVMTextboxObject.$schema){
			
			errorArray.push('Please esure the value of "$schema" of the VM installation parameters JSON is equal to "' + azureVMTextboxObject.$schema + '".');
		}
		
		if(typeof azureVMTextareaObject.parameters != "undefined") {
		
			var azureVMTextboxObjectKeys = Object.keys(azureVMTextboxObject.parameters);
			
			var azureVMTextareaObjectKeys = Object.keys(azureVMTextareaObject.parameters);
			
			var azureVMKeysToAdd = diff2(azureVMTextboxObjectKeys, azureVMTextareaObjectKeys);
			
			var azureVMKeysToRemove = diff2(azureVMTextareaObjectKeys, azureVMTextboxObjectKeys);
			
			for(var azureVMKeyToAdd in azureVMKeysToAdd){
				
				errorArray.push('Please add a "' + azureVMKeysToAdd[azureVMKeyToAdd] + '" key pair value to the VM installation parameters JSON. Keys are case sensitive.');
			}
			
			for(var azureVMKeyToRemove in azureVMKeysToRemove){
				
				errorArray.push('Please remove the "' + azureVMKeysToRemove[azureVMKeyToRemove] + '" key pair value from the VM installation parameters JSON. Keys are case sensitive.');
			}
		}
	}
	
	if(errorArray.length == 0){

		updateConfigAndParameters();
	} else{
	
		var errorText = '';

		for(i = 0; i <errorArray.length; i++){
			errorText += '' + eval(i + 1) + ') ' + errorArray[i] + '\n'
		}
	
		alert(errorText);
	}
}


function updateConfigAndParameters(){
	document.getElementById('ctl00_ctl00_cphMain_cphMacTool_SUBSCRIPTIONPARAMETERS').value = document.getElementById('subscriptionParametersTextarea').value;
	
	document.getElementById('ctl00_ctl00_cphMain_cphMacTool_INSTALLPARAMETERS').value = document.getElementById('installationParametersTextarea').value;
	
	document.getElementById('ctl00_ctl00_cphMain_cphMacTool_AUTOINSTALLERPARAMETERS').value = document.getElementById('autoInstallerParametersTextarea').value;
	
	document.getElementById('ctl00_ctl00_cphMain_cphMacTool_NEXT').click();
}
















function loadTextBoxes() {
	var subscriptionParameters = JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_SUBSCRIPTIONPARAMETERS').value);
	
	Object.keys(subscriptionParameters).forEach(function (key) { 
		var labelText = key.replace( /([A-Z])/g, " $1" );
		var labelTextInTitleCase = labelText.charAt(0).toUpperCase() + labelText.slice(1);
		
		var labelElement = document.createElement('h3');
		labelElement.classList.add('col-md-3');
		labelElement.classList.add('left-padding');
		labelElement.innerText = labelTextInTitleCase;
		
		var inputDiv = document.createElement('div');
		inputDiv.classList.add('ctx-input');
		inputDiv.classList.add('ctx-processed');
		inputDiv.classList.add('left-padding');
		inputDiv.style = 'width:450px;';
		
		var inputTextbox = document.createElement('input');
		inputTextbox.classList.add('ctx-input__field');
		inputTextbox.classList.add('subscription-parameter');
		inputTextbox.id = key.concat('Textbox');
		
		if(key.match(/password|Password/g)){
			inputTextbox.type = 'password';
		} else if(key.match(/Integer/g)){
			inputTextbox.type = 'number';
		} else{
			inputTextbox.type = 'text';
		}
		
		var upperCaseKey = key.toUpperCase();
		
		inputDiv.append(inputTextbox);
		
		var inputFields = document.getElementById("subscriptionParameters");
		
		var lineDiv = document.createElement('div');
		lineDiv.append(labelElement);
		lineDiv.append(inputDiv);
		
		inputFields.appendChild(document.createElement("br"));
		inputFields.append(lineDiv); 
		
		document.getElementById(inputTextbox.id).value = subscriptionParameters[key];				
	})
	
	var installParameters = JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_PARAMETERS').value);
	
	var keys = Object.keys(installParameters [Object.keys(installParameters).find(key => key.toLowerCase() === 'Parameters'.toLowerCase())]);
	
	for(i=0; i < keys.length; i++){
	
		var labelText = keys[i].replace( /([A-Z])/g, " $1" );
		var labelTextInTitleCase = labelText.charAt(0).toUpperCase() + labelText.slice(1);
		
		var labelElement = document.createElement('h3');
		labelElement.classList.add('col-md-3');
		labelElement.classList.add('left-padding');
		labelElement.innerText = labelTextInTitleCase;
		
		var inputDiv = document.createElement('div');
		inputDiv.classList.add('ctx-input');
		inputDiv.classList.add('ctx-processed');
		inputDiv.classList.add('left-padding');
		inputDiv.style = 'width:450px;';
		
		var inputTextbox = document.createElement('input');
		inputTextbox.classList.add('ctx-input__field');
		inputTextbox.classList.add('azure-installation-parameter');
		inputTextbox.id = keys[i].concat('Textbox');
		
		if(keys[i].match(/password|Password/g)){
			inputTextbox.type = 'password';
		} else if(keys[i].match(/Integer/g)){
			inputTextbox.type = 'number';
		} else{
			inputTextbox.type = 'text';
		}
		
		var upperCaseKey = keys[i].toUpperCase();
		
		inputDiv.append(inputTextbox);
		
		var inputFields = document.getElementById("installParameters");
		
		var lineDiv = document.createElement('div');
		lineDiv.append(labelElement);
		lineDiv.append(inputDiv);
		
		inputFields.appendChild(document.createElement("br"));
		inputFields.append(lineDiv); 
		
		document.getElementById(inputTextbox.id).value = installParameters.parameters[keys[i]].value;				
	}
	
	var autoInstallerParameters = JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_AUTOINSTALLERPARAMETERS').value);
	
	Object.keys(autoInstallerParameters).forEach(function (key) { 
		var labelText = key.replace( /([A-Z])/g, " $1" );
		var labelTextInTitleCase = labelText.charAt(0).toUpperCase() + labelText.slice(1);
		
		var labelElement = document.createElement('h3');
		labelElement.classList.add('col-md-3');
		labelElement.classList.add('left-padding');
		labelElement.innerText = labelTextInTitleCase;
		
		var inputDiv = document.createElement('div');
		inputDiv.classList.add('ctx-input');
		inputDiv.classList.add('ctx-processed');
		inputDiv.classList.add('left-padding');
		inputDiv.style = 'width:450px;';
		
		var inputTextbox = document.createElement('input');
		inputTextbox.classList.add('ctx-input__field');
		inputTextbox.classList.add('auto-installer-parameter');
		inputTextbox.id = key.concat('Textbox');
		
		if(key.match(/password|Password/g)){
			inputTextbox.type = 'password';
		} else if(key.match(/Integer/g)){
			inputTextbox.type = 'number';
		} else{
			inputTextbox.type = 'text';
		}
		
		var upperCaseKey = key.toUpperCase();
		
		inputDiv.append(inputTextbox);
		
		var inputFields = document.getElementById("autoInstallerParameters");
		
		var lineDiv = document.createElement('div');
		lineDiv.append(labelElement);
		lineDiv.append(inputDiv);
		
		inputFields.appendChild(document.createElement("br"));
		inputFields.append(lineDiv); 

		document.getElementById(inputTextbox.id).value = autoInstallerParameters[key];		
	})
	
	var cortexVersions = JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_CORTEXVERSIONS').value);

	var cortexVersionsArray = Object.keys(cortexVersions);
	
	var cortexVersionDropdown = document.createElement('select');
	cortexVersionDropdown.classList.add('form-control');
	cortexVersionDropdown.classList.add('versionsDropdown');
	cortexVersionDropdown.setAttribute("onchange","loadReleasesDropdown();");
	cortexVersionDropdown.id = 'cortexVersionToInstall'
	
	var option = document.createElement("option");
	option.text = '';
	option.selected = true;
	cortexVersionDropdown.append(option);
	
	for (i = 0; i < cortexVersionsArray.length; i++) {
	
		var option = document.createElement("option");
		option.text = cortexVersionsArray[i];
		
		cortexVersionDropdown.append(option);
	}
	
	var labelElement = document.createElement('h3');
	labelElement.classList.add('top-padding');
	labelElement.innerText = 'Cortex Version to Install';
	labelElement.id = 'cortexVersionLabel'
	
	var cortexVersionsTab = document.getElementById('cortexVersionsTab');
	
	cortexVersionsTab.append(labelElement);
	cortexVersionsTab.append(cortexVersionDropdown);
}

	function loadReleasesDropdown() {
	
		var cortexVersions = JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_CORTEXVERSIONS').value);
		
		var selectedCortexVersion = document.getElementById('cortexVersionToInstall').value;
		
		var rcElement =  document.getElementById('cortexRCToInstall');
		
		if (typeof(rcElement) != 'undefined' && rcElement != null) {
			document.getElementById("rcToInstallLabel").outerHTML = "";
			document.getElementById("cortexRCToInstall").outerHTML = "";
		}
		
		var releasetypeElement =  document.getElementById('cortexReleaseType');
		
		if (typeof(releasetypeElement) != 'undefined' && releasetypeElement != null) {
		
			document.getElementById("releaseTypeLabel").outerHTML = "";
			document.getElementById("cortexReleaseType").outerHTML = "";
		}
		
		if(selectedCortexVersion !== '') {

			var releaseTypeArray = Object.keys(cortexVersions[selectedCortexVersion]);
			
			var releaseTypeDropdown = document.createElement('select');
			releaseTypeDropdown.classList.add('form-control');
			releaseTypeDropdown.classList.add('versionsDropdown');
			releaseTypeDropdown.setAttribute("onchange","loadRCDropdown();");
			releaseTypeDropdown.id = 'cortexReleaseType'
			
			var option = document.createElement("option");
			option.text = '';
			option.selected = true;
			releaseTypeDropdown.append(option);
			
			for(i = 0; i < releaseTypeArray.length; i++) {
			
					var option = document.createElement("option");
					option.text = releaseTypeArray[i];
	
					releaseTypeDropdown.append(option);
			}
			
			var labelElement = document.createElement('h3');
			labelElement.classList.add('top-padding');
			labelElement.innerText = 'Cortex Release Type to Install';
			labelElement.id = 'releaseTypeLabel'
	
			var cortexVersionsTab = document.getElementById('cortexVersionsTab');
	
			cortexVersionsTab.append(labelElement);
			cortexVersionsTab.append(releaseTypeDropdown);
		}
	}

	function loadRCDropdown() {
	
		var cortexVersions = JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_CORTEXVERSIONS').value);
		
		var selectedCortexVersion = document.getElementById('cortexVersionToInstall').value;
		
		var selectedcortexReleaseType = document.getElementById('cortexReleaseType').value;
		
		var rcElement =  document.getElementById('cortexRCToInstall');
		
		if (typeof(rcElement) != 'undefined' && rcElement != null) {
			document.getElementById("rcToInstallLabel").outerHTML = "";
			document.getElementById("cortexRCToInstall").outerHTML = "";
		}
		
		if(selectedcortexReleaseType !== '') {
		
			var rcToInstallArray = cortexVersions[selectedCortexVersion][selectedcortexReleaseType]
			
			var rcToInstallDropDown = document.createElement('select');
			rcToInstallDropDown.classList.add('form-control');
			rcToInstallDropDown.classList.add('versionsDropdown');
			rcToInstallDropDown.id = 'cortexRCToInstall'
			
			var option = document.createElement("option");
			option.text = '';
			option.selected = true;
			rcToInstallDropDown.append(option);
			
			for(i = 0; i < rcToInstallArray.length; i++) {
	
				var option = document.createElement("option");
				option.text = rcToInstallArray[i];
	
				rcToInstallDropDown.append(option);
			}
			
			var labelElement = document.createElement('h3');
			labelElement.classList.add('top-padding');
			labelElement.innerText = 'Cortex Release Candidate Install';
			labelElement.id = 'rcToInstallLabel'
			
			var cortexVersionsTab = document.getElementById('cortexVersionsTab');
	
			cortexVersionsTab.append(labelElement);
			cortexVersionsTab.append(rcToInstallDropDown);
		}
	}

	function updateParameters() {
		
		if(document.getElementById('cortexVersionToInstall').value == ''){
        
			alert('Please select a "Cortex Version to Install" on the "Cortex installation Version" tab.');

		} else if(document.getElementById('cortexReleaseType').value == ''){

			alert('Please select a "Cortex Release Type to Install" on the "Cortex installation Version" tab.');

		} else if(document.getElementById('cortexRCToInstall').value == ''){

			alert('Please select a "Cortex Release Candidate to Install" on the "Cortex installation Version" tab.');
		} else {
		
			document.getElementById('ctl00_ctl00_cphMain_cphMacTool_CORTEXVERSION').value = document.getElementById('cortexVersionToInstall').value;

			document.getElementById('ctl00_ctl00_cphMain_cphMacTool_RELEASETYPE').value = document.getElementById('cortexReleaseType').value;
			
			document.getElementById('ctl00_ctl00_cphMain_cphMacTool_RCTOINSTALL').value = document.getElementById('cortexRCToInstall').value;
			
			var subscriptionTextboxes = document.getElementsByClassName('subscription-parameter');
			
			var subscriptionParameters = JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_SUBSCRIPTIONPARAMETERS').value);
			
			for(i=0; i < subscriptionTextboxes.length; i++) {

				var value = subscriptionTextboxes[i].value;
				var key = subscriptionTextboxes[i].id.replace('Textbox', '');

				subscriptionParameters[key] = value;
			}
			
			document.getElementById('ctl00_ctl00_cphMain_cphMacTool_SUBSCRIPTIONPARAMETERS').value = JSON.stringify(subscriptionParameters);
			
			var installationTextboxes = document.getElementsByClassName('azure-installation-parameter');
			
			var installationParameters = JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_PARAMETERS').value);
			
			for(i=0; i < Object.keys(installationParameters.parameters).length; i++) {

				var value = installationTextboxes[i].value;
				var key = installationTextboxes[i].id.replace('Textbox', '');

				installationParameters.parameters[key].value = value;
			}
			
			document.getElementById('ctl00_ctl00_cphMain_cphMacTool_PARAMETERS').value = JSON.stringify(installationParameters);
			
			var autoInstallerTextboxes = document.getElementsByClassName('auto-installer-parameter');
			
			var autoInstallerParameters = JSON.parse(document.getElementById('ctl00_ctl00_cphMain_cphMacTool_AUTOINSTALLERPARAMETERS').value);
			
			for(i=0; i < autoInstallerTextboxes.length; i++) {

				var value = autoInstallerTextboxes[i].value;
				var key = autoInstallerTextboxes[i].id.replace('Textbox', '');

				autoInstallerParameters[key] = value;
			}
			
			document.getElementById('ctl00_ctl00_cphMain_cphMacTool_AUTOINSTALLERPARAMETERS').value = JSON.stringify(autoInstallerParameters);
			
			document.getElementById('ctl00_ctl00_cphMain_cphMacTool_NEXT').click();
		}
	}
