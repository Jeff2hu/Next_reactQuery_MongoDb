export class TopicKey {
  public static TOPIC_LIST(page: number, authorId?: string) {
    return ['topicList', page, authorId ?? ''];
  }
  public static TOPIC(id: string) {
    return ['topic', id];
  }
}
