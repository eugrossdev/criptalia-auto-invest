var autoInvestAmount = "";

function parseDecimalValue(val) {
  var floatVal = parseFloat(val);
  if (isNaN(floatVal)) {
    return null;
  }
  return floatVal.toFixed("2");
}

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  
    return function( obj, callback ){
      if( !obj || obj.nodeType !== 1 ) return; 
  
      if( MutationObserver ){
        // define a new observer
        var mutationObserver = new MutationObserver(callback)
  
        // have the observer observe foo for changes in children
        mutationObserver.observe( obj, { childList:true, subtree:true })
        return mutationObserver
      }
      
      // browser support fallback
      else if( window.addEventListener ){
        obj.addEventListener('DOMNodeInserted', callback, false)
        obj.addEventListener('DOMNodeRemoved', callback, false)
      }
    }
  })();

var oldHtml = ""
function updateAutoInvestDiv(investBox) {
  var autoInvestDiv = investBox.querySelector('.eugruss-auto-invest');
  subLabel = investBox.querySelector('.sub-label');
  if(subLabel) {
    if(!autoInvestDiv) {
      investBox.insertAdjacentHTML('beforeend', '<div class="eugruss-auto-invest"></div>');
      autoInvestDiv = investBox.querySelector('.eugruss-auto-invest');
    }
    
    if(autoInvestAmount != "") {
      innerHTML = `<div style="margin-top: 20px;">
        <h5>Automatic investment enabled</h5>
        <p>When the project opens, you will automatically invest <strong>${autoInvestAmount} €</strong>.</p>
        <p><strong>Please stay on this page and don't touch anything until the project opens, or the auto-invest feature will be disabled!</strong></p>
        <p>You'll also need to manually verify that you have enough funds and that your value meets the minimum and maximum investment for the project, or the auto-invest will fail.</p>
        <span><a href="#" onClick="return false" class="eugross-auto-invest-disable-link">Click here</a> to disable automatic investment.</span>
      </div>`
    } else {
      innerHTML = `<div style="margin-top: 20px;">
        <h5>Automatic investment disabled</h5>
        <span><a href="#" onClick="return false" class="eugross-auto-invest-enable-link">Click here</a> to enable automatic investment as soon as the project opens.</span>
      </div>`
    }

    if(oldHtml != innerHTML) {
      autoInvestDiv.innerHTML = innerHTML;
      oldHtml = innerHTML;
      if(autoInvestAmount == "") {
        tippy(".eugross-auto-invest-enable-link", {
          theme: 'light',
          trigger: 'click',
          interactive: true,
          content: `<div style="margin: 10px;">
            <p>Specify the amount to auto-invest:</p>
            <input type="text" id="auto-invest-amount" />
            <button disabled="disabled" id="enable-auto-invest-button">Enable auto-invest</button>
          </div>`,
          allowHTML: true,
          onShown: function() {
            document.getElementById("enable-auto-invest-button").addEventListener("click", function() {
              autoInvestAmount = parseDecimalValue(document.getElementById("auto-invest-amount").value);
              updateAutoInvestDiv(investBox);
            });
            document.getElementById("auto-invest-amount").addEventListener("input", function() {
              amount = document.getElementById("auto-invest-amount").value
              document.getElementById("enable-auto-invest-button").disabled = !parseDecimalValue(amount);
            });
          }
        });
      } else {
        autoInvestDiv.querySelector(".eugross-auto-invest-disable-link").addEventListener("click", function() {
          autoInvestAmount = "";
          updateAutoInvestDiv(investBox);
        });
      }
    } 
  } else {
    if(autoInvestDiv) {
      autoInvestDiv.remove();
    }
  }
}

function onInvestBoxChange(investBox) {
    updateAutoInvestDiv(investBox);
    investForm = investBox.querySelector('input[name="invested"]');
    if(!investForm) return;
    if(investForm.disabled) return;
    if(autoInvestAmount == "") return;


    evt = document.createEvent("HTMLEvents");
    evt.initEvent("focus", false, true);
    investForm.dispatchEvent(evt);

    investForm.value = autoInvestAmount;

    var event = new Event('input', {
      bubbles: true,
      cancelable: true,
  });
  
  investForm.dispatchEvent(event);

  investButton = investBox.querySelector('button[type="submit"]');
  if(!investButton) return;
  investButton.click();
  autoInvestAmount = ""
}

function awaitInvestBox() {
    if(window.location.href.endsWith("/marketplace") || window.location.href.endsWith("/marketplace/") || window.location.href.indexOf("marketplace") < 0) {
      return
    }
    investBox = document.querySelector('.investbox');
    if(investBox) {
        updateAutoInvestDiv(investBox);
        observeDOM(investBox, function() { onInvestBoxChange(investBox) });        
    } else {
        window.setTimeout(awaitInvestBox, 100);
    }
}

var currentLocation = ""
window.setInterval(function() {
    if (currentLocation != window.location.href) {
      autoInvestAmount = "";
      awaitInvestBox();
      currentLocation = window.location.href;
    }
}, 100);
