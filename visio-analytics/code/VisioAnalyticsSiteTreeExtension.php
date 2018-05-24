<?php

/**
 * Visio Analytics include Extension
 * Copyright (C) 2018, Visionaer AG
 * @author Lukas Walliser <contact@lukas-walliser.ch>
 */
class VisioAnalyticsSiteTreeExtension extends Extension {

    public function onAfterInit() {

        $siteConfig = SiteConfig::current_site_config();

        $DisclaimerText = $siteConfig->VADisclaimerText ? $siteConfig->VADisclaimerText : _t('VisioCookie.FALLBACKDISCLAIMERTEXT','This website is using Cookies.');
        $AcceptText = $siteConfig->VAAcceptText ? $siteConfig->VAAcceptText : _t('VisioCookie.FALLBACKACCEPTTEXT','Accept');
        $DeclineText = $siteConfig->VADeclineText ? $siteConfig->VADeclineText : _t('VisioCookie.FALLBACKDECLINETEXT','Decline');
        $MoreText = $siteConfig->VAMoreText ? $siteConfig->VAMoreText : _t('VisioCookie.FALLBACKMORETEXT','Learn more');
        $MoreURL = $siteConfig->VAMoreURL ? $siteConfig->VAMoreURL : ($this->checkForLegalPage() != false ? $this->checkForLegalPage() : _t('VisioCookie.FALLBACKMOREURL','https://www.visionaer.swiss/cookie-policy'));
        $MoreNewTab = $siteConfig->VAMoreNewTab ? $siteConfig->VAMoreNewTab : ($this->checkForLegalPage() != false ? 'false' : 'true');
        $Position = $siteConfig->VAPosition ? $siteConfig->VAPosition : 'bottomleft';
        $ExpirationDays = $siteConfig->VAExpirationDays ? $siteConfig->VAExpirationDays : 14;

        $visiocookietemplateloader = new ArrayData( array(
            'DisclaimerText' => $DisclaimerText,
            'AcceptText' => $AcceptText,
            'DeclineText' => $DeclineText,
            'MoreText' => $MoreText,
            'MoreURL' => $MoreURL,
            'MoreNewTab' => $MoreNewTab,
            'Position' => $Position,
            'ExpirationDays' => $ExpirationDays
        ));

        Requirements::javascript(THIRDPARTY_DIR.'/jquery/jquery.js');

        Requirements::javascript(VISIOANALYTICS_BASE.'/javascript/VisioAnalytics.js');
        Requirements::css(VISIOANALYTICS_BASE.'/css/VisioAnalytics.css');
        Requirements::customScript($visiocookietemplateloader->renderWith('VisioAnalytics'));
    }

    private function checkForLegalPage() {

        $legalPage = false;
        $siteConfig = SiteConfig::current_site_config();

        try {
            $legalPage = $siteConfig->LegalLinks()->Link();
        } catch (Exception $e) {}

        if ($legalPage == NULL) {

            $candidates = SiteTree::get()->filter('URLSegment:PartialMatch', ['legal','rechtlich','agb','datenschutz','disclaimer','privacy','dsgvo','gdpr']);

            if (count($candidates) > 0) {
                $legalPage = $candidates->First()->Link();
            } else {
                $legalPage = false;
            }
        }
        return $legalPage;
    }
}