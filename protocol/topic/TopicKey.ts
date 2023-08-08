export class TopicKey {
  public static TOPIC_LIST(page: number) {
    return ['topicList', page];
  }
  public static TOPIC(id: string) {
    return ['topic', id];
  }
}
