document.getElementById('getRandom').addEventListener('click', getRandom)             // has the 'random' button been clicked?

function getRandom () {                                                               // perform a random search in Wikipedia
  window.open('https://en.wikipedia.org/wiki/Special:Random')
}

document.getElementById('searchTopic').addEventListener('keypress', function (e) {    // search user supplied topic in Wikipedia
  var lookUpTopic = document.getElementById('searchTopic').value

  if (e.keyCode === 13) {                                                             // has the ENTER key been pressed?
    document.getElementById('searchTopic').value = ''

    var rowItems = document.querySelectorAll('.row_item')
    var itemCount = rowItems.length

    for (var rowCounter = 0; rowCounter < itemCount; rowCounter++) {                  // clear up previous search results
      var elementTarget = document.querySelector('.row_item')
      elementTarget.parentNode.removeChild(elementTarget)
    }

    var xhr = new XMLHttpRequest()
    var apiURL = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=7&format=json&origin=*&srsearch=' + lookUpTopic

    xhr.open('GET', apiURL, true)

    xhr.onload = function () {
      if (this.status === 200) {
        var wikiData = JSON.parse(this.responseText)
        var resultHits = wikiData.query.search.length
        var urlWikipedia = 'https://en.wikipedia.org/wiki/'

        for (var counter = 0; counter < resultHits; counter++) {                      // store each result on separate <p> elements
          var urlResult = urlWikipedia + wikiData.query.search[counter].title
          var hitResult = wikiData.query.search[counter].title
          var parent = document.querySelector('.container-result')
          var a = document.createElement('a')
          var p = document.createElement('p')

          a.href = urlResult
          a.target = '_blank'
          a.innerHTML = hitResult

          p.classList.add('row_item')
          p.append(a)
          parent.append(p)
        }
      } else {
        window.alert('Unable to access Wikipedia API')
      }
    }
    xhr.send()                                                                        // execute AJAX request
  }
})
