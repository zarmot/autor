import * as api from "@autor/api"

export function init(
  boardcast: Sender 
) {
  const map = new Map<number, OutputBlock>()
  const outputs: OutputBlock[] = []

  let count = 0
  function new_key() {
    count += 1
    return count
  }

  function sort(a: OutputBlock, b: OutputBlock) {
    return a.key >= b.key ? 1 : -1
  }
  function set_block(key: number, content: string) {
    let block = map.get(key)
    if (block) {
      block.content = content
    } else {
      block = { key, content }
      map.set(key, block)
      outputs.push(block)
      outputs.sort(sort)
    }
    boardcast(api.outputs.r_current_output, outputs)
  }

  return {
    new_key,
    set_block
  }
}