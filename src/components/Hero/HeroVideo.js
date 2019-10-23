import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  useCallback,
} from "react"
import styled, { keyframes } from "styled-components"
import { useSpring, animated } from "react-spring"
import { cover } from "polished"
import Player from "@vimeo/player"
import { useInView } from "react-intersection-observer"
import { useMediaQuery } from "react-responsive"

import c from "../../styles/constants"

const videoRatio = 0.5625 // 1920 x 1080

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
`

const VideoContainer = styled.div`
  width: 100%;
  padding-top: ${videoRatio * 100}%;
  height: 0px;
  position: relative;

  iframe,
  object,
  embed {
    width: 100%;
    height: 100%;
    ${cover()}
  }
`

const WidthConstraint = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: 1460px) {
    width: 85%;
  }
`

const CloseButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${c.WHITE};
  padding: ${c.BASE};
  top: 0;
  right: 0;
`

const SvgMask = styled.svg`
  ${cover()}
  ${props => props.theme.open && "visibility: hidden"}
`

const BlobWrapper = styled(animated.g)`
  transform-origin: 50% 50%;
  transform-box: fill-box;
  transition: transform 2s;

  ${props =>
    props.theme.open &&
    `
    transform: scale(1.2);
  `}
`

const Transformer = styled.g``
/**
 * Blob Guide
 * https://blobs.dev/
 * {
 *   complexity: 0.9,
 *   contrast: 0.35,
 *   guides: false,
 *   seed: "111111111111",
 * }
 */
const blobPaths = [
  // 111111111111
  "M1046.76086,173.743106 C1090.93221,197.080015 1104.92979,253.053488 1137.15767,291.225861 C1168.39374,328.223482 1210.73237,354.579273 1234.87287,396.552742 C1261.31593,442.529692 1297.78624,494.989014 1283.76971,546.142485 C1269.10536,599.660158 1197.50408,614.645356 1163.16892,658.237006 C1134.29609,694.893731 1131.6357,747.628214 1098.88718,780.867917 C1064.61796,815.651122 1021.30252,849.594741 972.521678,851.743681 C923.024961,853.924157 886.574267,802.308795 838.038847,792.359055 C789.057046,782.317806 731.619716,820.99079 689.683271,793.761927 C648.425947,766.97401 660.459197,700.075019 633.02358,659.244946 C603.203915,614.866898 542.005595,595.103368 522.694171,545.246384 C503.14977,494.787917 498.719787,431.053246 526.696008,384.735312 C555.796852,336.55543 627.81147,336.60351 670.718663,300.174374 C707.085467,269.29817 716.691162,212.807173 757.769279,188.549102 C799.292513,164.028174 850.809638,167.851829 898.969128,165.384459 C948.791504,162.831893 1002.65068,150.438512 1046.76086,173.743106 Z",
  // 2222222222222222222
  "M899.196824,109.085435 C949.858531,102.438603 1006.22337,101.287627 1049.58354,128.32756 C1093.07234,155.447706 1099.578,216.751757 1133.48566,255.190805 C1167.00533,293.189998 1224.46351,307.913646 1247.71612,352.93836 C1271.24087,398.490014 1268.60428,453.515517 1262.17839,504.382289 C1255.80861,554.804866 1233.84755,600.883177 1210.67974,646.115026 C1186.76381,692.807459 1165.64951,743.831392 1123.52416,775.08486 C1081.32962,806.389657 1027.16482,820.872202 974.633338,821.245438 C924.684757,821.592823 878.602856,797.811571 833.133958,777.12683 C793.417581,759.05903 762.223948,728.53363 724.117848,707.276921 C681.128486,683.296185 625.72586,679.810521 592.902267,643.118495 C559.575604,605.864112 539.801332,553.709272 542.06422,503.767326 C544.311802,454.163222 588.726492,417.499391 605.246782,370.675104 C621.320583,325.116326 608.506042,269.241955 638.24025,231.170782 C667.92311,193.165353 721.731612,186.043755 765.404459,165.611947 C809.741996,144.869172 850.665715,115.452732 899.196824,109.085435",
  // gareth
  "M885.237234,110.570221 C939.993262,121.029082 972.061787,177.732464 1013.20987,215.323587 C1045.05584,244.416704 1065.61501,283.99201 1101.41413,308.060165 C1150.14524,340.822653 1235.52697,327.496248 1259.65668,381.012606 C1282.47337,431.616856 1228.11009,485.999891 1204.24151,536.117083 C1185.32137,575.843959 1156.1742,608.153088 1133.51478,645.874542 C1111.22186,682.98587 1103.04471,729.01431 1070.92514,758.050706 C1038.11421,787.712096 992.897112,797.341332 950.827835,811.025262 C905.584351,825.741671 860.387372,846.959283 813.075996,841.921644 C764.784004,836.77959 718.255773,814.523603 681.859564,782.385952 C646.308264,750.99435 634.376954,702.077576 609.195224,661.89605 C583.161681,620.355318 536.307908,588.5311 529.914101,539.932369 C523.529121,491.400735 557.826365,447.697926 574.982752,401.850257 C591.54707,357.584801 603.828028,312.239703 629.877023,272.797642 C658.060345,230.123896 690.286395,189.318205 733.461805,161.88936 C779.033602,132.938119 832.198635,100.439404 885.237234,110.570221",
  // rosie
  "M902.988284,160.191073 C953.595783,160.014139 1008.68968,116.21694 1052.08126,142.274517 C1097.58093,169.598047 1087.82891,240.963589 1114.2072,287.032575 C1134.84485,323.075677 1177.28268,344.466857 1190.41592,383.872294 C1203.56456,423.323941 1192.54715,465.947018 1187.59849,507.238397 C1182.69945,548.115749 1173.76847,587.294249 1161.33292,626.539442 C1146.76095,672.526916 1141.33454,724.658864 1107.7391,759.265555 C1073.73382,794.294431 1024.19187,818.45623 975.385922,818.087892 C926.447918,817.710046 891.590134,766.410582 843.515123,757.248452 C794.09329,747.829645 740.241628,785.298108 694.410607,764.5354 C649.691094,744.276236 621.197244,695.748683 605.237278,649.302065 C589.816357,604.424172 603.364826,555.851566 606.430053,508.494811 C609.117586,466.973305 611.625655,426.276267 622.276255,386.055413 C633.299625,344.426833 649.63483,305.438842 670.215535,267.615744 C694.394778,223.179275 708.438834,164.507357 754.358517,143.315414 C800.135306,122.189416 852.576515,160.367322 902.988284,160.191073",
]

let blobs = [...blobPaths.slice(1)]
let config = { duration: 10000 }
// robin
const endPath =
  "M1618.5278,-1434.30156 C1865.44176,-1335.4192 1892.99608,-988.519319 2021.46326,-755.584598 C2127.52662,-563.272136 2252.81037,-384.199608 2314.00697,-173.269373 C2374.24109,34.343461 2377.47984,249.037582 2375.64819,465.207343 C2373.69218,696.053469 2376.36031,927.49537 2302.82579,1146.32002 C2222.30397,1385.93754 2100.01154,1610.65201 1928.37412,1796.20935 C1741.23636,1998.52411 1538.11281,2274.63648 1262.57443,2270.93651 C965.374345,2266.94567 790.684322,1923.07229 531.556151,1777.45269 C346.684286,1673.56214 153.600098,1597.67157 -48.6904488,1534.05843 C-336.205799,1443.64515 -762.449007,1580.33411 -917.438047,1321.7959 C-1070.98918,1065.65627 -691.350424,764.157982 -689.266289,465.509778 C-687.474434,208.743935 -994.594096,-23.6594784 -906.365954,-264.791234 C-816.907399,-509.285771 -439.510732,-501.885625 -264.716358,-694.805613 C-90.6542676,-886.917381 -135.805399,-1261.11863 97.9209456,-1373.21945 C329.148445,-1484.12176 588.397941,-1216.58203 844.629395,-1226.87473 C1114.43,-1237.7125 1367.8561,-1534.6888 1618.5278,-1434.30156 Z"

let player

const HeroVideo = ({ open, setOpen }) => {
  const videoRef = useRef(null)
  const [ref, inView] = useInView({ threshold: 0 })
  const [isActive, setActive] = useState(false)
  const [transform, setTransform] = useState("")
  // Setting the transform in css doesnt provide the correct output
  // Feels like a bug
  const isXLarge = useMediaQuery({ query: `(min-width: 1460px)` })
  const isLarge = useMediaQuery({ query: `(min-width: 1024px)` })

  const calculateTransform = useCallback(() => {
    let updateTransform
    if (isXLarge) {
      updateTransform = "translate(284 0) scale(0.7 0.9)"
    } else if (isLarge) {
      updateTransform = "translate(142 0) scale(1 0.9)"
    } else {
      updateTransform = "translate(-800, -100) scale(1.2)"
    }

    return setTransform(updateTransform)
  }, [isXLarge, isLarge])

  useEffect(() => {
    player = new Player(videoRef.current)
  }, [videoRef])

  useEffect(() => {
    calculateTransform()
  }, [isXLarge, isLarge, calculateTransform])

  useLayoutEffect(() => {
    document.body.classList[open ? "add" : "remove"]("hero--open")
  }, [open])

  useEffect(() => {
    if (!open && isActive) {
      setActive(false)
      player.pause()
      player.setCurrentTime(0)
      config = {}
    }
  }, [open, isActive, setActive])

  const resetConfig = () => {
    config = { duration: 10000 }
  }

  const blob = useSpring({
    cancel: open ? "d" : !inView,
    from: {
      d: blobPaths[0],
    },
    to: async next => {
      while (!open && !isActive) {
        await next({
          d: blobs.pop(),
          onRest: resetConfig,
          config,
        })

        await next({ delay: 4000 })

        if (!blobs.length) {
          blobs = blobPaths
            .map(a => [Math.random(), a])
            .sort((a, b) => a[0] - b[0])
            .map(a => a[1])
        }
      }
      if (open) {
        await next({
          d: endPath,
          delay: 500,
          onRest: () => {
            setActive(true)
            player.play()
          },
        })
      }
    },
  })

  return (
    <VideoWrapper ref={ref}>
      <WidthConstraint>
        <VideoContainer>
          <iframe
            ref={videoRef}
            title="FEL Intro 2019"
            aria-hidden="true"
            src="https://player.vimeo.com/video/367773374"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </VideoContainer>
        {isActive && (
          <CloseButton onClick={() => setOpen(false)}>
            <svg width="18" height="19" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.547.906l1.414 1.415-7.547 7.546.02.02-.016.014L18 17.485 16.586 18.9 9 11.312 1.414 18.9 0 17.485l7.581-7.584-.014-.014.018-.02L.039 2.321 1.453.906 9 8.453 16.547.906z"
                fill="currentColor"
              />
            </svg>
          </CloseButton>
        )}
      </WidthConstraint>
      <SvgMask
        theme={{ open: isActive }}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 1420 800"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id="hero-mask">
            <rect x="0" y="0" fill="#fff" width="100%" height="100%" />
            <Transformer transform={transform}>
              <BlobWrapper theme={{ open }}>
                <animated.path d={blob.d} fill="#000" />
              </BlobWrapper>
            </Transformer>
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          fill={c.ORANGE}
          width="100%"
          height="100%"
          mask="url(#hero-mask)"
        />
      </SvgMask>
    </VideoWrapper>
  )
}

export default HeroVideo
