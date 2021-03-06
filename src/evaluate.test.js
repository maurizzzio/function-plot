import evaluate from './evaluate'
import { scaleLinear as d3ScaleLinear } from 'd3-scale'

const width = 200
const height = 100
const nSamples = 100
const config = {
  options: {
    xAxis: {
      type: 'linear'
    }
  },
  emit: () => {},
  meta: {
    xScale: d3ScaleLinear()
      .domain([-5, 5])
      .range([0, width]),
    yScale: d3ScaleLinear()
      .domain([-5, 5])
      .range([height, 0])
  }
}

describe('evaluate', () => {
  it('should eval linear functions (builtin)', () => {
    const d = { fn: 'x^2', sampler: 'builtIn', fnType: 'linear', nSamples }
    const out = evaluate(config, d)
    expect(out instanceof Array).toEqual(true)
    expect(out.length).toEqual(1)
    expect(out[0].length).toEqual(nSamples)
    expect(out[0][0]).toEqual([-5, 25])
    expect(out[0][nSamples-1]).toEqual([5, 25])
    expect(out[0][nSamples/2][0]).toBeCloseTo(0, 0)
    expect(out[0][nSamples/2][1]).toBeCloseTo(0, 0)
  })

  it('should eval linear functions (interval)', () => {
    const d = { fn: 'x^2', sampler: 'interval', fnType: 'linear', nSamples }
    const out = evaluate(config, d)
    expect(out.length).toEqual(1)
    expect(out[0][0][0].lo <= -5 && -5 <= out[0][0][0].hi).toBe(true)
    expect(out[0][0][1].lo <= 25 && 25 <= out[0][0][1].hi).toBe(true)
    expect(out[0][nSamples-2][0].lo <= 5 && 5 <= out[0][nSamples-2][0].hi).toBe(true)
    expect(out[0][nSamples-2][1].lo <= 25 && 25 <= out[0][nSamples-2][1].hi).toBe(true)
    expect(out[0][nSamples/2][0].lo).toBeCloseTo(0, 0)
    expect(out[0][nSamples/2][0].hi).toBeCloseTo(0, 0)
    expect(out[0][nSamples/2][1].lo).toBeCloseTo(0, 0)
    expect(out[0][nSamples/2][1].hi).toBeCloseTo(0, 0)
  })

})
