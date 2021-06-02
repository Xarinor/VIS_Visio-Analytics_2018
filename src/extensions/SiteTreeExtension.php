<?php

/**
 * LICENSE
 * Copyright (C) 2018, Visionaer AG - Lukas Walliser (Xarinor) - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential
 * Written by Lukas Walliser <contact@lukas-walliser.ch>
 */

namespace VIS\analytics;

use Exception;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\Extension;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\View\Requirements;

class SiteTreeExtension extends Extension {

    public function onAfterInit() {

        $siteConfig = SiteConfig::current_site_config();

        $TrackingCode = $siteConfig->VATrackingCode ? $siteConfig->VATrackingCode : null;
        $G4TrackingCode = $siteConfig->G4TrackingCode ? $siteConfig->G4TrackingCode : null;
        $awProperty = $siteConfig->awProperty ? $siteConfig->awProperty : null;
        $FBPCode = $siteConfig->FBPixelCode ? $siteConfig->FBPixelCode : null;
        $DisablePopup = $siteConfig->VADisablePopup ? $siteConfig->VADisablePopup : 0;
        $DisclaimerText = $siteConfig->VADisclaimerText ? $siteConfig->VADisclaimerText : _t('VisioAnalytics.FALLBACKDISCLAIMERTEXT','This website is using Cookies.');
        $AcceptText = $siteConfig->VAAcceptText ? $siteConfig->VAAcceptText : _t('VisioAnalytics.FALLBACKACCEPTTEXT','Accept');
        $DeclineText = $siteConfig->VADeclineText ? $siteConfig->VADeclineText : _t('VisioAnalytics.FALLBACKDECLINETEXT','Decline');
        $MoreText = $siteConfig->VAMoreText ? $siteConfig->VAMoreText : _t('VisioAnalytics.FALLBACKMORETEXT','Learn more');
        $MoreURL = $siteConfig->VAMoreURL ? $siteConfig->VAMoreURL : ($this->checkForLegalPage() != false ? $this->checkForLegalPage() : _t('VisioAnalytics.FALLBACKMOREURL','https://www.visionaer.swiss/cookie-policy'));
        $MoreNewTab = $siteConfig->VAMoreNewTab ? $siteConfig->VAMoreNewTab : ($this->checkForLegalPage() != false ? 'false' : 'true');
        $Position = $siteConfig->VAPosition ? $siteConfig->VAPosition : 'bottomleft';
        $ExpirationDays = ($siteConfig->VAExpirationDays && $siteConfig->VAExpirationDays != 0) ? $siteConfig->VAExpirationDays : 14;

        $visioAnalyticsTemplateData = [
            'TrackingCode' => $TrackingCode,
            'G4TrackingCode' => $G4TrackingCode,
            'awProperty' => $awProperty,
            'FBPCode' => $FBPCode,
            'DisablePopup' => $DisablePopup,
            'DisclaimerText' => $DisclaimerText,
            'AcceptText' => $AcceptText,
            'DeclineText' => $DeclineText,
            'MoreText' => $MoreText,
            'MoreURL' => $MoreURL,
            'MoreNewTab' => $MoreNewTab,
            'Position' => $Position,
            'ExpirationDays' => $ExpirationDays,
            'BackgroundColor' => $siteConfig->VABackgroundColor,
            'TextColor' => $siteConfig->VATextColor,
            'ButtonColor' => $siteConfig->VAButtonColor,
            'ButtonTextColor' => $siteConfig->VAButtonTextColor
        ];

//        Requirements::javascript(THIRDPARTY_DIR.'/jquery/jquery.js');

        Requirements::javascript(VISIOANALYTICS_BASE.'/javascript/VisioAnalytics.js');
        Requirements::javascriptTemplate(VISIOANALYTICS_BASE.'/javascript/VisioAnalyticsTemplate.js', $visioAnalyticsTemplateData);
        Requirements::css(VISIOANALYTICS_BASE.'/css/VisioAnalytics.css');
    }

    private function checkForLegalPage() {

        $legalPage = false;
        $siteConfig = SiteConfig::current_site_config();

        try { $legalPage = $siteConfig->LegalLinks()->Link(); } catch (Exception $e) {}

        if ($legalPage == NULL) {

            $candidates = SiteTree::get()->filter('URLSegment:PartialMatch', ['datenschutz','disclaimer','privacy','dsgvo','gdpr']);

            if (count($candidates) > 0) {
                $legalPage = $candidates->First()->Link();
            } else {
                $legalPage = false;
            }
        }
        return $legalPage;
    }
}