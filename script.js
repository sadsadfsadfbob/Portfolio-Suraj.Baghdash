document.addEventListener("DOMContentLoaded", function(){
    let activeItemIndicator = CSSRulePlugin.getRule(".menu-item p#active::after");
    const toggleButton = document.querySelector(".burger");
    let isOpen = false;

    gsap.set(".menu-item p", {y: 225});
    const timeline = gsap.timeline({paused: true});

    timeline.to(".overlay", {
       duration: 1,
       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
       ease: "power4.inOut"
    });

    timeline.to(".menu-item p", {
        duration: 1,
        y: 0,
        stagger: 0.2,
        ease: "power4.out"
    }, "-=1");

    timeline.to(activeItemIndicator, {
        width: "100%",
        duration: 1,
        ease: "power4.out",
        delay: 0.5
    }, "<");

    timeline.to(".sub-nav", {
        bottom: "10%",
        opacity: 1,
        duration: 0.5,
        delay: 0.5
    },"<");

    toggleButton.addEventListener("click", function(){
        if (isOpen) {
            timeline.reverse();
        } else {
            timeline.play();
        }
        isOpen=!isOpen;
    })

    // Intercept clicks on menu links to reverse the animation before navigating
    document.querySelectorAll(".overlay-menu a").forEach(link => {
      link.addEventListener("click", function (e) {
        if (this.target === "_blank") {
      return;
    }
        e.preventDefault(); // Prevent immediate navigation
        const targetURL = this.href;

        if (isOpen) {
          // Reverse the timeline and navigate after the animation completes
          timeline.reverse();
          timeline.eventCallback("onReverseComplete", function () {
            window.location.href = targetURL;
          });
        } else {
          // If menu isn't open, navigate immediately
          window.location.href = targetURL;
        }
      });
    });

})