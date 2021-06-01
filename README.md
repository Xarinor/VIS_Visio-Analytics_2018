# VisioAnalytics

## Simple Silverstripe Analytics Module for simple DSGVO / GDPR implementations
This module allows users to add cookie consent and Analytics opt-out functionality by drag and drop/dev-build only.
- The module uses the config from admin -> settings -> VisioAnalytics or tries to work with an existing Google Analytics snippet.
- The console notifies you about existing Google Tagmanager implementations and warns you when there is no ip-anonymization set up.
- If a UA-Tracking-Code is added in the CMS, the module uses this to add Analytics inluding ip-anonymization directly.
- You can use the classes ```va-decline-consent``` and ```va-accept-consent``` anywhere on your site (except ajax) to set the consent cookie or change its value (accepted/declined)

Back end control is provided by a simple CMS filter.

Also, please [report any issues](mailto:contact@lukas-walliser.ch) you may encounter!

## Credits and Authors
 * This module was created for Visionaer AG <www.visionaer.swiss>
 * Lukas Walliser - <contact@lukas-walliser.ch>

## Requirements
#### Mandatory
 - [SilverStripe ~3.2](http://www.silverstripe.org/)

## Installation
Use [composer](https://getcomposer.org/) to install the module and all its dependencies.

    composer require xx
    
If the above fails (composer complains about no matching packages when resolving requirements), then open up your `composer.json` file and add `"minimum-stability": "dev"` in the "root" of the JSON structure: 
    
    {
        "minimum-stability": "dev",
        ... 
    }
    
After doing so, run the composer require command again and it should successfully install the module and all requirements.
If you don't use composer, make sure you install at least the modules that are listed as "mandatory" under **Requirements**
After installing, make sure you rebuild the database and flush the cache (`dev/build?flush=1`).
 
 ## License
 Revised BSD License
 
 Copyright (c) 2018, Visionaer AG & Lukas Walliser
 
 All rights reserved.
 
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 
  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.
  * The name of Damian Mooyman may not be used to endorse or promote products
    derived from this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.