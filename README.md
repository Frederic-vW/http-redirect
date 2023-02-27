# http-redirect
This site contains a simple html that redirects to an http site ([http://nerve.bsd.uchicago.edu/diffusion.html](http://nerve.bsd.uchicago.edu/diffusion.html))  
**Q:** Can the http link be embedded in an iFrame on a https site?  
**A:** No.  
**Q:** Can the https site iFrame load the github page (https) which then redirects to the http link?  
**A:** No. Redirection does work ([https://frederic-vw.github.io/http-redirect/index.html](https://frederic-vw.github.io/http-redirect/index.html)), but the https site does not embed the redirecting github page.  
**Q:** Can the https site load the js code from github?  
**A:** Yes, if the github page is published via 'pages'.  
