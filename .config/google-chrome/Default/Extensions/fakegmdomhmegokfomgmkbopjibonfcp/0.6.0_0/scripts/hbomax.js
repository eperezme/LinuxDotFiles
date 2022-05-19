'use strict'
;(function() {
  const mainWorldScript = function() {
    const getVideo = () => document.querySelector('video')

    const hboPlayer = () => {
      const vid = getVideo()
      return vid ? vid._dispNode : null
    }

    document.addEventListener('metastreamplay', e => {
      const player = hboPlayer()
      const video = getVideo()
      if (player && video && video.paused) {
        e.preventDefault()
        player.play()
      }
    })

    document.addEventListener('metastreampause', e => {
      const player = hboPlayer()
      const video = getVideo()
      if (player && video && !video.paused) {
        e.preventDefault()
        player.pause()
      }
    })
  }

  // Inject inline script at top of DOM to execute as soon as possible
  const script = document.createElement('script')
  script.textContent = `(${mainWorldScript}());`
  document.documentElement.appendChild(script)
})()
