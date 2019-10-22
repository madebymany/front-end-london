import React, { useState, useLayoutEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"
import { useInView } from "react-intersection-observer"
import uuid4 from "uuid/v4"

import c from "../../styles/constants"

const Wrapper = styled.div`
  position: relative;
`

const ExpandedWrapper = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: scale(1.004);
`

const PathGroup = styled.g`
  transform-origin: 50% 50%;
`

/**
 * Blob Guide
 * https://blobs.dev/
 * {
 *   complexity: 0.3,
 *   contrast: 0.4,
 *   guides: false,
 *   seed: "raffi",
 * }
 */
const blobPaths = [
  // raffi
  "M300,108.77685626488028C360.01232464102344,103.82878392728962,424.41520252431644,123.8866176705045,459.2335533976281,173.01547854820626C492.47040366851735,219.9128344543739,477.1528682558323,281.54345687864674,461.6751719013479,336.90130295738834C447.4342551988611,387.8356575784514,425.27859728936124,438.29648769400603,378.28097685111277,462.55212337591934C329.84524704994936,487.54997231144716,273.3671953438191,480.6821530194698,222.87808179126515,460.14531330513967C167.2010927866948,437.4982648919567,105.85938876493968,405.9388386061829,94.15674178234201,346.9823804353871C82.65084973910609,289.01714881099804,131.9682040062948,241.52710737598133,170.60754804153936,196.8129628408828C206.49340007928325,155.28520881593832,245.30074418082035,113.28686110513041,300,108.77685626488028",
  // joe
  "M300,114.73922491456324C355.5510987814308,112.75962479942228,404.45397603101526,145.64802559203076,440.6341312170333,187.84802278581975C478.7961826611475,232.35967442387602,513.1678244040861,288.5801509093178,497.4763214686701,345.0726817217954C482.279129975637,399.7855930481914,420.3573709465918,419.056160467594,369.43425835631706,444.1817231320239C317.51652165643173,469.79803526408045,263.9098616924528,507.9825590869492,209.98286204297176,486.922513025973C152.93518438888412,464.64375235180347,118.90163997196527,403.8881232149524,110.80980467380672,343.1814275018015C103.4965212596726,288.3155961388095,136.0919498907477,240.07229874604647,171.39692330929626,197.44246861076084C205.5989989947484,156.14435858360565,246.41204296261677,116.6488671763439,300,114.73922491456324",
  // lukasz
  "M300,130.8918820595744C360.7912544288529,128.67638991472333,432.8940378624249,116.2201610490864,470.21988481006326,164.25417160534641C507.3446807487429,212.02945296785984,475.5366978163529,278.054159828515,459.7409313318759,336.45982516950573C445.1452641638186,390.42806108156435,435.92599874374304,453.400931282787,385.494416020079,477.5309841531507C335.14589408684935,501.62129483902623,278.2646038067717,473.5871370623106,229.356894805222,446.691919457267C184.63747583731922,422.09991691070013,147.52254696036826,386.9865103687735,132.27629243768246,338.28184175162085C115.23743224498426,283.8506345285914,108.79247983549348,220.4668692436254,144.65817270534345,176.11902655214516C180.33794601987864,132.0010729421972,243.2975334065672,132.9583613667,300,130.8918820595744",
  // callum
  "M300,89.17514691259237C360.14708066339244,91.34921695502739,405.93338232178195,138.72179117590284,440.1356254589336,188.24556786210894C470.96675522360283,232.88807798421203,486.583663290786,286.96488250508236,472.8461894016268,339.4510148041252C459.60287812844814,390.04912280926493,417.9575101978405,424.50493934502293,371.8403754444631,449.17807674821756C322.36837176356244,475.6461032411432,265.23363190467495,501.49955958279185,214.4180794896647,477.7126890994641C163.19147246421198,453.73340305996345,146.53890775536058,393.04217250419345,134.0630957621935,337.87401555278257C121.63023029580417,282.8957685431926,115.27332675192024,224.52172693375937,146.55780779803987,177.63393498715772C181.03207699644145,125.96543010440585,237.9268537012731,86.93145750457286,300,89.17514691259237",
  // memona
  "M300,132.90926464327237C357.4825007188638,127.97927589494526,419.66862245956804,131.08561430074823,459.6248486491689,172.70343099790648C503.36992420858223,218.26765739396268,526.7491490859056,287.4293555580841,505.4372909208364,346.8897210490717C485.8105816584828,401.6484988659051,419.2110011743042,413.72732318029233,365.3563349846258,435.71382799712455C317.86820341011344,455.10115517742906,269.74063010530585,480.5163200851298,221.61870474316788,462.7604366918657C168.36804107432144,443.1121668522328,123.69657859437174,398.41930330567664,113.13627087909202,342.6504267720559C102.92703157356085,288.73553890296927,134.87302232811228,238.39628696805312,171.37523132302562,197.42516982895802C204.94505800157546,159.7454419698126,249.7197915438159,137.22154853580633,300,132.90926464327237",
  // spencer
  "M300,138.02338605195575C358.31092705080283,132.23654720325698,425.3456630790098,125.18954686015655,464.17738767497696,169.0729022729759C504.2929252114288,214.40708224064178,495.18735877396256,282.49891415291916,479.6054593952258,340.9937740718053C464.86157351999424,396.34270926699804,434.6643106489332,447.62256765875975,383.25103539787057,472.87255629047917C331.3790541459671,498.3478237290821,271.7181913046742,491.76624254236685,218.5057460865553,469.2245619489668C161.24026153583674,444.96594619700653,99.3792728730092,409.4845884466724,88.90254079997845,348.1816175227459C78.76055647862351,288.8373710889357,129.4963273698692,240.52888905606164,172.16225110347665,198.05279716039172C207.26272725787845,163.1084921917464,250.71285189090565,142.91469541444943,300,138.02338605195575",
  // george
  "M300,95.83097590319272C359.57934639281035,92.91332774210368,412.1142478537977,134.54074572578514,445.4516793182097,184.00615637547065C475.6487101402453,228.8119036811006,473.6494252829511,284.22292863690427,462.61497499977213,337.11580688181533C451.2262354516455,391.7069463425954,435.5007823094598,452.8915252496748,384.6030253987793,475.67999245531814C334.61024262784167,498.0632753314895,282.4110865974782,462.73169694985296,232.51224469826838,440.13976789068386C180.13873082175706,416.42741976710363,112.31538207969007,401.7929595602078,98.273159248649,346.0428350108369C84.0863008371654,289.71848145791273,134.92259213488552,242.6457659822774,171.3784554314732,197.4277409696478C207.45663367471388,152.67817756085412,242.5869919247495,98.64253674726334,300,95.83097590319272",
  // susan
  "M300,90.44856907687182C358.1950651108942,89.77407945297412,386.8679967617666,156.2879172743437,422.81048137079,202.06190923095676C458.18695204521407,247.11506294915887,512.0484584186474,289.6559153279545,500.47186678948367,345.75639539351107C488.77443514106244,402.4424695016521,426.30211861663884,429.5922345081612,371.82395976281805,449.14398923404224C325.44124519226926,465.79035684050393,276.17650905531326,463.0355237225489,231.47296918461868,442.29784573171116C185.8096380397947,421.11492688435777,143.18021663304458,387.4201441074415,132.65546473249714,338.19529814965983C122.2636048651295,289.59199557115267,152.88812216164473,246.05430138778473,180.7081349540534,204.86791211570664C213.1553629802281,156.83112024727964,242.03531559488997,91.12038855347608,300,90.44856907687182",
  // tom
  "M300,115.6873971555982C353.7349498371337,115.17749561157144,394.2851714540643,156.23739962940311,430.57682707486094,195.86845520309902C471.7462311785197,240.82608841267557,527.1956678755485,289.32889058395494,513.3810395622637,348.7028298386731C499.5902028122745,407.97451525044676,428.46543150255957,426.95243514334874,371.7045167515823,448.89596326554005C322.68950176960976,467.8449594962258,269.7465769644368,483.9378772129392,222.36638833165688,461.2078557225023C174.9155981760702,438.44396408133446,148.0861401245356,388.61862939050206,138.2770466394657,336.91220876364457C128.9458924756675,287.72513731185643,142.9483395021947,238.7338524914672,172.49411897300348,198.3174529549645C203.94045729976693,155.30123214311533,246.71762196883722,116.19300415643944,300,115.6873971555982",
  // eva
  "M300,145.23018834684905C348.78572712450784,146.88522775782434,394.87824608026006,162.261230955601,429.2264087340647,196.94537789374272C469.55941213554036,237.67290764644105,510.4357942421138,289.23855644404284,498.03229274456055,345.19957853746575C485.5802089929077,401.3797897522471,424.7830206721305,426.49081174983303,372.85377851031365,451.28242989780813C321.2487018838519,475.9192876865965,263.4679398404254,507.6112784659343,212.61233708398356,481.4623518415591C162.51668665366805,455.7041773966256,156.75106827516478,390.4162215011738,146.68789442443534,334.9924876426364C137.43160608035956,284.012740168359,126.72880554979088,228.09113901289172,159.29046679251812,187.78789170496827C191.6893552860452,147.68611662283521,248.4753942872353,143.48223339945318,300,145.23018834684905",
  // monty
  "M300,108.24426056828446C362.53463247850823,99.61413963703055,429.79966834476966,115.82906968742573,471.3652069734833,163.3408076583217C514.8749719538562,213.07490520938035,530.8356674214307,285.2635256958223,509.6120634972989,347.8425856467122C490.27174700750845,404.8686604552246,427.77919457195543,426.5544386161602,373.35629589738403,452.32591800420937C319.63438031032905,477.7654530888262,263.08966428325243,513.4459598545931,208.2318643897213,490.5584971182956C151.1231859328926,466.7319354873762,117.6506070260426,404.6074854057095,111.41972820714781,343.0422164354394C105.94673095260963,288.9653265066188,145.1599893448571,246.03906853134714,179.19571107504856,203.66179431948996C213.00231806790333,161.56978680851432,246.51962276741222,115.62484480894395,300,108.24426056828446",
]

const getRandomBlobs = () =>
  blobPaths
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])

const Blob = ({ transform, fill, children }) => {
  let blobs = getRandomBlobs()
  const [ref, inView] = useInView({ threshold: 0 })
  const [uuid] = useState(uuid4())
  const [animate, setAnimate] = useState(false)
  const blob = useSpring({
    cancel: !inView,
    from: {
      d: blobs[0],
    },
    to: async next => {
      while (true) {
        await next({
          d: blobs.pop(),
          config: { duration: 10000 },
        })

        if (!blobs.length) {
          blobs = getRandomBlobs()
        }
      }
    },
  })

  // SVG only seems to render if we delay the initial mount
  useLayoutEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <Wrapper ref={ref}>
      {children}
      <ExpandedWrapper>
        {animate && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 600"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <mask id={`blob-${uuid}`}>
                <rect x="0" y="0" fill="#fff" width="100%" height="100%" />
                <PathGroup transform={transform}>
                  <animated.path d={blob.d} fill="#000" />
                </PathGroup>
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              fill={fill}
              width="100%"
              height="100%"
              mask={`url(#blob-${uuid})`}
            />
          </svg>
        )}
      </ExpandedWrapper>
    </Wrapper>
  )
}

Blob.propTypes = {
  fill: PropTypes.string,
  transform: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Blob.defaultProps = {
  fill: c.WHITE,
}

export default Blob
