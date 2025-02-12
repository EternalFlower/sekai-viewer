import { Link, Typography, useTheme, Grid, Box, Chip } from "@mui/material";
import {
  Album,
  AspectRatio,
  GitHub,
  // MonetizationOn,
  MoveToInbox,
  OpenInNew,
  Settings as SettingsIcon,
  Textsms,
  Timeline,
  Translate,
  Twitter,
} from "@mui/icons-material";
import { Alert, AlertTitle } from "@mui/material";
import Calculator from "~icons/mdi/calculator";
import CalendarText from "~icons/mdi/calendar-text";
import Discord from "~icons/mdi/discord";
import Patreon from "~icons/mdi/patreon";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { getJPTime, useVersionInfo } from "../utils";
import AnnouncementWidget from "../components/widgets/AnnouncementWidget";
import CurrentEventWidget from "../components/widgets/CurrentEventWidget";
// import AdSense from "../components/blocks/AdSenseBlock";
import SekaiGameNews from "../components/blocks/SekaiGameNews";
import { useRootStore } from "../stores/root";
import Countdown from "../components/widgets/Countdown";
import ContainerContent from "../components/styled/ContainerContent";
import TypographyHeader from "../components/styled/TypographyHeader";
import LinkNoDecoration from "../components/styled/LinkNoDecoration";

interface IDetectResult {
  webp: number;
  webpLossless: number;
  webpAlpha: number;
}

function getWebpDetectSeverity(detected: IDetectResult) {
  const sum = detected.webp + detected.webpLossless + detected.webpAlpha;
  switch (sum) {
    case -3:
      return "info";
    case 0:
      return "warning";
    case 3:
      return "success";
    default:
      return "warning";
  }
}

const VersionInfo = () => {
  const { t } = useTranslation();

  const [version] = useVersionInfo();

  return (
    (!!version && (
      <Fragment>
        <TypographyHeader>{t("home:versionInfo.caption")}</TypographyHeader>
        <ContainerContent>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>{t("home:versionInfo.gameClientVer")}</Grid>
                <Grid item>
                  <Chip label={version.appVersion} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>{t("home:versionInfo.dataVer")}</Grid>
                <Grid item>
                  <Chip label={version.dataVersion} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>{t("home:versionInfo.assetVer")}</Grid>
                <Grid item>
                  <Chip label={version.assetVersion} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>{t("home:versionInfo.multiPlayerVer")}</Grid>
                <Grid item>
                  <Chip label={version.multiPlayVersion} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ContainerContent>
      </Fragment>
    )) ||
    null
  );
};

function Home() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const {
    settings: { isShowSpoiler, region },
  } = useRootStore();

  const [jpTime] = useState<string>(getJPTime());

  const splitJPTime = useMemo(() => jpTime.split("/"), [jpTime]);

  useEffect(() => {
    document.title = t("title:home");
  }, [t]);

  const [detected, setDetected] = useState<IDetectResult>({
    webp: -1,
    webpAlpha: -1,
    webpLossless: -1,
  });

  useEffect(() => {
    setDetected({
      webp: Number(Modernizr.webp),
      webpAlpha: Number(Modernizr.webpalpha),
      webpLossless: Number(Modernizr.webplossless),
    });
  }, []);

  return (
    <Fragment>
      <TypographyHeader>{t("common:home")}</TypographyHeader>
      <ContainerContent>
        {/* <Typography variant="h4">Welcome to Sekai Viewer Open Beta!</Typography> */}
        {/* <Box paddingTop="1%" paddingBottom="1%">
          {new Date().getTime() - 1640962800000 < 259200000 ? (
            <Typography align="center" variant="h4">
              {t("home:happy_new_year")}
            </Typography>
          ) : (
            1640962800000 - new Date().getTime() > 0 &&
            1640962800000 - new Date().getTime() < 259200000 && (
              <Fragment>
                <Typography align="center" variant="h4">
                  {t("home:new_year_countdown")}
                </Typography>
                <Countdown endDate={new Date(1640962800000)} />
              </Fragment>
            )
          )}
        </Box> */}
        <Box paddingTop="1%" paddingBottom="1%">
          {new Date().getTime() - 1664463600000 > 0 &&
          new Date().getTime() - 1664463600000 < 604800000 ? (
            <Typography align="center" variant="h4">
              {t("home:happy_2_year_anniversary")}
            </Typography>
          ) : (
            1664463600000 - new Date().getTime() > 0 &&
            1664463600000 - new Date().getTime() < 604800000 && (
              <Fragment>
                <Typography align="center" variant="h4">
                  {t("home:2_year_anniversary_countdown")}
                </Typography>
                <Countdown endDate={new Date(1664463600000)} />
              </Fragment>
            )
          )}
        </Box>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            {jpTime === "12/6" ? (
              <img
                src={`/images/banner-shizuku.webp`}
                alt="banner"
                style={{ height: "auto", width: "100%" }}
                width="1500"
                height="500"
              />
            ) : jpTime === "12/27" ? (
              <img
                src={`/images/banner-rin-ren.webp`}
                alt="banner"
                style={{ height: "auto", width: "100%" }}
                width="1500"
                height="500"
              />
            ) : jpTime === "1/8" ? (
              <img
                src={`/images/banner-shiho.webp`}
                alt="banner"
                style={{ height: "auto", width: "100%" }}
                width="1500"
                height="500"
              />
            ) : jpTime === "1/27" ? (
              <img
                src={`/images/banner-mafuyu.webp`}
                alt="banner"
                style={{ height: "auto", width: "100%" }}
                width="1500"
                height="500"
              />
            ) : jpTime === "1/30" ? (
              <img
                src={`/images/banner-luka.webp`}
                alt="banner"
                style={{ height: "auto", width: "100%" }}
                width="1500"
                height="500"
              />
            ) : jpTime === "2/17" ? (
              <img
                src={`/images/banner-kaito.webp`}
                alt="banner"
                style={{ height: "auto", width: "100%" }}
                width="1500"
                height="500"
              />
            ) : jpTime === "4/14" ? (
              <img
                src={`/images/banner-minori.webp`}
                alt="banner"
                style={{ height: "auto", width: "100%" }}
                width="1500"
                height="500"
              />
            ) : jpTime === "7/20" ? (
              <img
                src={`/images/banner-nene.webp`}
                alt="banner"
                style={{ height: "auto", width: "100%" }}
                width="1500"
                height="500"
              />
            ) : jpTime === "7/26" ? (
              <img
                src={`/images/banner-an.webp`}
                alt="banner"
                style={{ height: "auto", width: "100%" }}
                width="1500"
                height="500"
              />
            ) : jpTime === "10/5" ? (
              <img
                src={`/images/banner-haruka.webp`}
                alt="banner"
                style={{ height: "auto", width: "100%" }}
                width="1500"
                height="500"
              />
            ) : jpTime === "9/30" ||
              (splitJPTime[0] === "10" && Number(splitJPTime[1]) < 16) ? (
              <img
                src={`/images/banner-anni.webp`}
                alt="banner"
                style={{ height: "auto", width: "100%" }}
                width="1500"
                height="500"
              />
            ) : (
              <img
                src={`/images/banner-new.webp`}
                alt="banner"
                style={{ height: "auto", width: "100%" }}
                width="1500"
                height="500"
              />
            )}
          </Grid>
        </Grid>
        <Alert sx={{ margin: theme.spacing(1, 0) }} severity="info">
          {t("home:disclaimer")}
        </Alert>
        {/* <Alert className={layoutClasses.alert} severity="info">
          {t("home:alert0")}
        </Alert> */}
        {/* <Alert className={layoutClasses.alert} severity="info">
          <Trans
            i18nKey="home:alert_settings"
            components={{ s: <Settings fontSize="inherit" /> }}
          />
        </Alert> */}
        {/* {window.isChinaMainland && (
          <Alert sx={{ margin: theme.spacing(1, 0) }} severity="info">
            本站已启用腾讯云CDN加速数据加载，并计划迁移更多数据加速本站访问，但是费用相对高昂，你可以通过
            <Link
              href="https://afdian.net/@sekaiviewer"
              target="_blank"
              underline="hover"
            >
              <MonetizationOn fontSize="inherit" />
              爱发电
            </Link>
            来赞助支持让我更轻松地进行迁移工作。
          </Alert>
        )} */}
        {getWebpDetectSeverity(detected) !== "success" && (
          <Alert
            sx={{ margin: theme.spacing(1, 0) }}
            severity={getWebpDetectSeverity(detected)}
          >
            <AlertTitle>WebP {t("common:support")}</AlertTitle>
            <Trans
              i18nKey="home:detect.warning"
              components={{
                l: <Link href="https://caniuse.com/webp" underline="hover" />,
              }}
            />
          </Alert>
        )}
      </ContainerContent>
      <TypographyHeader>{t("home:directLink.caption")}</TypographyHeader>
      <ContainerContent>
        <Grid container rowSpacing={2}>
          <Grid item container columnSpacing={2} rowSpacing={1}>
            <Grid item>
              <LinkNoDecoration
                to="/card"
                style={{ color: theme.palette.primary.main }}
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <AspectRatio fontSize="small"></AspectRatio>
                  </Grid>
                  <Grid item>{t("common:card")}</Grid>
                </Grid>
              </LinkNoDecoration>
            </Grid>
            <Grid item>
              <LinkNoDecoration
                to="/music"
                style={{ color: theme.palette.primary.main }}
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <Album fontSize="small"></Album>
                  </Grid>
                  <Grid item>{t("common:music")}</Grid>
                </Grid>
              </LinkNoDecoration>
            </Grid>
            <Grid item>
              <LinkNoDecoration
                to="/gacha"
                style={{ color: theme.palette.primary.main }}
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <MoveToInbox fontSize="small"></MoveToInbox>
                  </Grid>
                  <Grid item>{t("common:gacha")}</Grid>
                </Grid>
              </LinkNoDecoration>
            </Grid>
            <Grid item>
              <LinkNoDecoration
                to="/event"
                style={{ color: theme.palette.primary.main }}
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <CalendarText fontSize="small"></CalendarText>
                  </Grid>
                  <Grid item>{t("common:event")}</Grid>
                </Grid>
              </LinkNoDecoration>
            </Grid>
            <Grid item>
              <LinkNoDecoration
                to="/music_recommend"
                style={{ color: theme.palette.primary.main }}
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <Calculator fontSize="small"></Calculator>
                  </Grid>
                  <Grid item>{t("common:musicRecommend")}</Grid>
                </Grid>
              </LinkNoDecoration>
            </Grid>
            <Grid item>
              <LinkNoDecoration
                to="/eventtracker"
                style={{ color: theme.palette.primary.main }}
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <Timeline fontSize="small"></Timeline>
                  </Grid>
                  <Grid item>{t("common:eventTracker")}</Grid>
                </Grid>
              </LinkNoDecoration>
            </Grid>
            <Grid item>
              <LinkNoDecoration
                to="/storyreader"
                style={{ color: theme.palette.primary.main }}
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <Textsms fontSize="small"></Textsms>
                  </Grid>
                  <Grid item>{t("common:storyReader")}</Grid>
                </Grid>
              </LinkNoDecoration>
            </Grid>
          </Grid>
          <Grid item container columnSpacing={2} rowSpacing={1}>
            <Grid item>
              <LinkNoDecoration
                to="/settings"
                style={{ color: theme.palette.primary.main }}
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <SettingsIcon fontSize="small"></SettingsIcon>
                  </Grid>
                  <Grid item>{t("common:settings.title")}</Grid>
                </Grid>
              </LinkNoDecoration>
            </Grid>
            <Grid item>
              <Link
                href="https://www.transifex.com/dnaroma/sekai-viewer"
                target="_blank"
                underline="hover"
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <Translate fontSize="small"></Translate>
                  </Grid>
                  <Grid item>{t("home:alert1.translation")}</Grid>
                </Grid>
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="https://github.com/Sekai-World/sekai-viewer"
                target="_blank"
                underline="hover"
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <GitHub fontSize="small"></GitHub>
                  </Grid>
                  <Grid item>{t("home:alert1.development")}</Grid>
                </Grid>
              </Link>
            </Grid>
            {i18n.language.startsWith("zh") && (
              <Grid item>
                <Link
                  href="https://b23.tv/AIjzvc"
                  target="_blank"
                  underline="hover"
                >
                  <Grid container direction="row" alignContent="center">
                    <Grid item>
                      <OpenInNew fontSize="small"></OpenInNew>
                    </Grid>
                    <Grid item>攻略合集（by @xfl33）</Grid>
                  </Grid>
                </Link>
              </Grid>
            )}
            <Grid item>
              <Link
                href="https://www.patreon.com/bePatron?u=6503151"
                target="_blank"
                underline="hover"
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <Patreon fontSize="small" />
                  </Grid>
                  <Grid item>Patreon</Grid>
                </Grid>
              </Link>
            </Grid>
            {/* {window.isChinaMainland && (
              <Grid item>
                <Link
                  href="https://afdian.net/@sekaiviewer"
                  target="_blank"
                  underline="hover"
                >
                  <Grid container direction="row" alignContent="center">
                    <Grid item>
                      <OpenInNew fontSize="small" />
                    </Grid>
                    <Grid item>爱发电</Grid>
                  </Grid>
                </Link>
              </Grid>
            )} */}
            <Grid item>
              <LinkNoDecoration
                to="/about"
                style={{ color: theme.palette.primary.main }}
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <OpenInNew fontSize="small" />
                  </Grid>
                  <Grid item>{t("home:directLink.contribList")}</Grid>
                </Grid>
              </LinkNoDecoration>
            </Grid>
            <Grid item>
              <Link
                href="https://github.com/Sekai-World/sekai-viewer/blob/main/CHANGELOG.md"
                target="_blank"
                underline="hover"
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <OpenInNew fontSize="small" />
                  </Grid>
                  <Grid item>{t("home:changelog")}</Grid>
                </Grid>
              </Link>
            </Grid>
          </Grid>
          <Grid item container columnSpacing={2} rowSpacing={1}>
            <Grid item>
              <Link
                href="https://www.twitter.com/SekaiViewer"
                target="_blank"
                underline="hover"
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <Twitter fontSize="small"></Twitter>
                  </Grid>
                  <Grid item>@SekaiViewer</Grid>
                </Grid>
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="https://discord.gg/xcDBRMd"
                target="_blank"
                underline="hover"
              >
                <Grid container direction="row" alignContent="center">
                  <Grid item>
                    <Discord fontSize="small"></Discord>
                  </Grid>
                  <Grid item>Sekai Viewer</Grid>
                </Grid>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </ContainerContent>
      <VersionInfo />
      {/* <AdSense
        client="ca-pub-7767752375383260"
        slot="7908750736"
        format="auto"
        responsive="true"
      /> */}
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <CurrentEventWidget />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnnouncementWidget />
        </Grid>
      </Grid>
      <TypographyHeader>{t("home:game-news.title")}</TypographyHeader>
      <ContainerContent>
        <SekaiGameNews isShowSpoiler={isShowSpoiler} region={region} />
      </ContainerContent>
    </Fragment>
  );
}

export default Home;
